//Перевіряємо вхідні дані
const typeCheck = (data, si) => isNaN(data[1]) || si.units[data[0]] === undefined || si.units[data[0]][data[2]] === undefined

//Створюємо вхідний JSON-обʼєкт 
const inConstructor = (data) => {
  return JSON.stringify(input = {
    distance: {
      unit: data[0],
      value: data[1]
    },
    convert_to: data[2]
  })
}

const convertation = (data, si) => {
  data = JSON.parse(data)
  const unit = data.distance.unit 
  const convert_to = data.convert_to
  const startValue = data.distance.value
  let convertedValue
  const rule = si.units[unit][convert_to]
  convertedValue = startValue * rule
  return JSON.stringify(out = {
    unit: convert_to,
    value: convertedValue.toFixed(2)
  })
}
//Основна функція
const main = () => {
  const nodeData = [process.argv[2], parseInt(process.argv[3]), process.argv[4]]
  const mainDB = require('./si.json')
  let input, output
  if (typeCheck(nodeData, mainDB)) {
    throw 'invalid parameter'
  } else {
    input = inConstructor(nodeData)
    output = convertation(input, mainDB)
    console.log(input)
    console.log(output)
  }
}
var time = performance.now()
main()
time = performance.now() - time
console.log('Debug time -', Math.round(time), 'ms')