import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from "."
import { Feature } from "../interfaces/places"

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints } = useContext(MapContext)

  const [activeId, setActiveId] = useState("")

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

  if (isLoadingPlaces) return <LoadingPlaces />
  if (places.length === 0) return <></>

  return (
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
          <button
            onClick={() => getRoute(place)}
            className={`btn ${
              activeId === place.id ? "btn-light" : "btn-outline-primary"
            } btn-sm`}
          >
            Directions
          </button>
        </li>
      ))}
    </ul>
  )
}
