const setRandomCoordinates = () => {
  var rand = [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)]
  console.log(rand)
  return rand
}
let r = setRandomCoordinates()
const f = (s) => { //Находит расстояние между 's' и неизвестной 'r'
  return Math.sqrt((r[0] - s[0])**2 + (r[1] - s[1])**2 + (r[2] - s[2])**2)
}
const myAlgorithm = () => {
  const L = f([0, 0, 0]) //расстояние от этой точки до неизвестной 
  const Lz = f([0, 0, 100]) //расстояние от этой точки до неизвестной 
  const Ly = f([0, 100, 0]) //расстояние от этой точки до неизвестной 
  let y = Math.round((L**2 - Ly**2 + 10000) / 200)
  let z = Math.round((L**2 - Lz**2 + 10000) / 200)
  let x = Math.round(Math.sqrt((L**2 - y**2 - z**2)))
  console.log('Unknown point:', x, y, z)
}
const main = () => {
  myAlgorithm()
}
main()