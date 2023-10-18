import { createContext } from "react"

import { Map } from "mapbox-gl"

export interface MapContextProps {
  // Properties
  isMapReady: boolean
  map?: Map
  displaySearchResult: boolean

  // Methods
  setMap: (map: Map) => void
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>
  getGazaSize: (start: [number, number]) => void
  showHideResults: () => void
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps)
