import {
  BtnMyLocation,
  BtnSetGazaSize,
  MapView,
  SearchBar,
} from "../components"

export const HomeScreen = () => {
  return (
    <>
      <MapView />
      <BtnMyLocation />
      <BtnSetGazaSize />
      <SearchBar />
    </>
  )
}
