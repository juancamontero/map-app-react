import React from "react"
import ReactDOM from "react-dom/client"
import { MapsApp } from "./MapsApp.tsx"

import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = import.meta.env.VITE_MAPS_TOKEN

if (!navigator.geolocation) {
  alert("Geolocation is not supported by your browser")
  throw new Error("Geolocation is not supported by your browser")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
