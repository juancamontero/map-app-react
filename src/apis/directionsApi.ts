import axios from "axios"

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    access_token: import.meta.env.VITE_MAPS_TOKEN,
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    notifications: "none",
  },
})

export default directionsApi
