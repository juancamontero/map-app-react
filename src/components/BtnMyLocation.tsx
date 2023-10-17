import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

export const BtnMyLocation = () => {
  const { userLocation } = useContext(PlacesContext)
  const { isMapReady, map } = useContext(MapContext)

  const onClick = () => {
    if (!userLocation) throw new Error("Ubicación no disponible")
    if (!isMapReady) throw new Error("Mapa no está listo")

    map?.flyTo({
      center: userLocation,
      zoom: 14,
    })
  }

  return (
    <button
      className="btn btn-primary btn-sm"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999,
        width: "200px",
      }}
      onClick={onClick}
    >
      ¿Dónde estoy?
    </button>
  )
}
