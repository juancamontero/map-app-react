export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        //! OJO con el orden cambia según el servicio de mapas
        resolve([coords.longitude, coords.latitude])
      },
      (err) => {
        alert("Can´t get user location")
        console.error(err)
        reject()
      }
    )
  })
}
