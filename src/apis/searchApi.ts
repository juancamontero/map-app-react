import axios from "axios"

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token: 
    import.meta.env.VITE_MAPS_TOKEN,
    language: "en,es",
    limit: 5,
  },
})

export default searchApi
