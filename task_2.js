const data = require('./data.json')
const sortBy = (title) => [data.data[0][title], data.data[1][title], data.data[2][title]]
const getCondition = () => {
   const CheckData = (unit, sort_by ) => {
      Object.keys(data.data[0]).forEach(element => {
         if (unit === element) {
            return true
         }
      });
      return false
   }
   let func, value, unit
   let sort_by = data.condition.sort_by[0]
   if (data.condition['exclude']) {
      func = 'exclude'
   } else if (data.condition['include']) {
      func = 'include'
   } else {
      throw 'invalid module'
   }
   value = data.condition[func][0][Object.keys(data.condition[func][0])[0]]
   unit = Object.keys(data.condition[func][0])[0]
   if(CheckData(unit)) {
      throw 'invalid module parameter'
   }
   return [func, unit, value, sort_by] //[ 'exclude', 'disabled', true, 'user' ]
}
const compiling = (module, key, value, sort_by, arr) => {
   let out = {result: [] }
   let count = 0
   const excludeSort = () => {
      for (let x = 0; x < arr.length; x++) {
         for (let y = 0; y < arr.length; y++) {
            if(arr[x] === data.data[y][sort_by] && data.data[y][key] !== value) {
               out.result[count++] = data.data[y]
            }
         }
      }
   }
   const includeSort = () => {
      for (let x = 0; x < arr.length; x++) {
         for (let y = 0; y < arr.length; y++) {
            if(arr[x] === data.data[y][sort_by] && data.data[y][key] === value) {
               out.result[count++] = data.data[y]
            }
         }
      }
   }
   if(module === 'exclude'){
      excludeSort()
   } else {
      includeSort()
   }
   return out
}
const main = () => {
   try {
   let condition = getCondition() //exclude: [{disabled: true}], sort_by: [rating]
   let module = condition[0]
   let moduleKey = condition[1]
   let moduleValue = condition[2]
   let sort_by = condition[3]
   const arr = sortBy(sort_by)
   arr.sort()
   let output = JSON.stringify(compiling(module, moduleKey, moduleValue, sort_by, arr), null, 1)
   console.log(output) 
   } catch (err) { 
      console.log(err); 
    }
}
main()
