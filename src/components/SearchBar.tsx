import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResults } from "."

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext)
  const debounceRef = useRef<NodeJS.Timeout>()

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    // * Primero limpio el debouce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    // * Luego creo el timeout
    debounceRef.current = setTimeout(() => {
      // todo: buscar o consultar

      searchPlacesByTerm(event.target.value)
    }, 350)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search place..."
        className="form-control"
        onChange={onQueryChange}
      />
      <SearchResults />
    </div>
  )
}
