const VECTORS_BUILDER = [
  [0.10533, 0.076],
  [-0.00544, 0.07144],
  [0.2017, 0.17132],
  [-0.07642, 0.05585],
  [-0.27245, -0.27218],
  [0.04728, -0.10243],
]

export const buildGazaCoords = (start: [number, number]) => {
  const coords: number[][] = []
  coords.push(start)

  for (let i = 0; i < VECTORS_BUILDER.length; i++) {
    const newCoord = [
      Math.round((coords[i][0] + VECTORS_BUILDER[i][0]) * 100000) / 100000,
      Math.round((coords[i][1] + VECTORS_BUILDER[i][1]) * 100000) / 100000,
    ]
    coords.push(newCoord)
  }

  return coords
}
