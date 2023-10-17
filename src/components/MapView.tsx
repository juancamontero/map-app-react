import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { Loading } from "."
import { Map } from "mapbox-gl"

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)

  // * uso el useRef para hacer referencia al DIV del map y poder cambiar el ID el DIV a futuro usando mas mapas
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      })
      setMap(map)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "gray",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  )
}
