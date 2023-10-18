import {
  AnySourceData,
  LngLat,
  LngLatBounds,
  Map,
  Marker,
  Popup,
} from "mapbox-gl"
import { MapContext } from "./MapContext"
import { useContext, useEffect, useReducer } from "react"
import { mapReducer } from "./mapReducer"
import { PlacesContext } from ".."
import { directionsApi } from "../../apis"
import { DirectionsResponse } from "../../interfaces/directions"
import { buildGazaCoords } from "../../helpers"

export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
  displaySearchResult: boolean
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  displaySearchResult: false,
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = useContext(PlacesContext)

  // * se limpian marcadores antiguos, si hay places, se crean los nuevos markers

  useEffect(() => {
    //* limpiar marcadores
    state.markers.forEach((marker) => marker.remove())

    // * crear nuevos marcadores
    const newMarkers: Marker[] = []

    // * recorro places y creo markers
    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`
        <h4>${place.text}</h4>
        <p>${place.place_name}</p>
        `)
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }
    // * actualizo el estado
    dispatch({ type: "setMarkers", payload: newMarkers })

    //TODO limpiar polylines
  }, [places])

  // * defino una función para hacer el set del mapa y proveerla al contexto
  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Acá Toy!</h4>
      <p>Esta es mi ubicación</p>
`)

    new Marker({ color: "#63ed" })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ type: "setMap", payload: map })
  }

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    )

    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100) / 100
    const minutes = duration / 60

    console.log({ kms, minutes })

    // * debo definir unos límites para que se vea toda la ruta
    const bounds = new LngLatBounds(start, start)

    // * recorro las coordinadas y las añado a los bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    // * ajusta el mapa a los bound con un padding
    state.map?.fitBounds(bounds, { padding: 20 })

    // * creo polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    }

    // * remover polylines if them exist previusly porque solo creé un ID

    if (state.map?.getLayer("RouteStringLayer")) {
      // * remuevo layer y data
      state.map?.removeLayer("RouteStringLayer")
      state.map?.removeSource("RouteString")
    }

    // * adiciono la data al mapa
    state.map?.addSource("RouteString", sourceData)

    //* creo un layer con el ID del source de la data
    state.map?.addLayer({
      id: "RouteStringLayer",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 6,
      },
    })
  }

  const getGazaSize = (start: [number, number]) => {
    const coords = buildGazaCoords(start)

    // * debo definir unos límites para que se vea toda la ruta
    const startLike = new LngLat(start[0], start[1])

    const bounds = new LngLatBounds(startLike, startLike)

    // * recorro las coordinadas y las añado a los bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    // * ajusta el mapa a los bound con un padding
    state.map?.fitBounds(bounds, { padding: 20 })

    // *vuelo al punto
    // state.map?.setZoom(9)

    // * creo polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    }

    // * remover polylines if them exist previusly porque solo creé un ID

    if (state.map?.getLayer("Gaza")) {
      // * remuevo layer y data
      state.map?.removeLayer("Gaza")
      state.map?.removeSource("GazaSizePolyline")
    }

    // * adiciono la data al maoa
    state.map?.addSource("GazaSizePolyline", sourceData)

    //* creo un layer con el ID del source de la data
    state.map?.addLayer({
      id: "Gaza",
      type: "line",
      source: "GazaSizePolyline",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "red",
        "line-width": 6,
      },
    })
  }

  // * Show / hide resultds
  const showHideResults = () => {
    dispatch({ type: "swapSearchResults" })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Methods
        getGazaSize,
        getRouteBetweenPoints,
        setMap,
        showHideResults,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
