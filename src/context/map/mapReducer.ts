import { MapState } from "./MapProvider"

import { Map, Marker } from "mapbox-gl"

type MapsAction =
  | { type: "setMap"; payload: Map }
  | { type: "setMarkers"; payload: Marker[] }
  | { type: "swapSearchResults" }

export const mapReducer = (state: MapState, action: MapsAction): MapState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      }
    case "setMarkers":
      return {
        ...state,
        markers: action.payload,
      }
    case "swapSearchResults":
      return {
        ...state,
        displaySearchResult: !state.displaySearchResult,
      }
    default:
      return state
  }
}
