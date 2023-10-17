import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

export const BtnSetGazaSize = () => {
  const { userLocation } = useContext(PlacesContext)
  const { getGazaSize } = useContext(MapContext)

  const drawGazaStrip = () => {
    if (!userLocation) throw new Error("Ubicación no disponible")
    getGazaSize(userLocation)
  }

  return (
    <button
      className="btn btn-danger btn-sm mobile-btn"
      style={{
        position: "fixed",
        bottom: "60px",
        right: "20px",
        zIndex: 999,
        width: "200px",
      }}
      onClick={drawGazaStrip}
    >
      Gaza en su ubicación
    </button>
  )
}
