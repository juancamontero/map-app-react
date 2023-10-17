import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from "."
import { Feature } from "../interfaces/places"

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints, getGazaSize } = useContext(MapContext)

  const [activeId, setActiveId] = useState("")
  const [hideResults, setHideResults] = useState(false)
  const swapResults = () => setHideResults(!hideResults)

  const onPlaceClick = (place: Feature) => {
    setActiveId(place.id)
    const [lng, lat] = place.center

    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    })
  }

  const getRoute = (place: Feature) => {
    if (!userLocation) return
    const [lng, lat] = place.center

    getRouteBetweenPoints(userLocation, [lng, lat])
  }

  const getGazaLines = (place: Feature) => {
    const [lng, lat] = place.center

    getGazaSize([lng, lat])
  }

  if (isLoadingPlaces) return <LoadingPlaces />
  if (places.length === 0) return <></>

  return (
    <>
      {!hideResults && (
        <ul className="list-group mt-3">
          {places.map((place) => (
            <li
              className={`list-group-item list-group-item-action pointer ${
                activeId === place.id ? "active" : ""
              }`}
              key={place.id}
              onClick={() => onPlaceClick(place)}
            >
              <h6>{place.text}</h6>
              <p className="text-muted" style={{ fontSize: "10px" }}>
                {place.place_name}
              </p>
              <div className="d-flex flex-row justify-content-start">
                <button
                  onClick={() => getRoute(place)}
                  className={`btn ${
                    activeId === place.id ? "btn-light" : "btn-outline-primary"
                  } btn-sm`}
                >
                  Directions
                </button>
                <button
                  onClick={() => getGazaLines(place)}
                  className={`btn ${
                    activeId === place.id ? "btn-danger" : "btn-outline-danger"
                  } btn-sm ms-2`}
                >
                  Gaza Size
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn-success btn-sm mx-auto mt-2 mb-2"
        onClick={swapResults}
      >
        Hide / Show result
      </button>
    </>
  )
}
