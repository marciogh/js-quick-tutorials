let input = "My random phrase"
let result = [...input].map( (e, idx) => idx % 2 ? e.toUpperCase() : e.toLowerCase() ).join('')
/*                 1     2      3           4           5                6              7
 * 1: elegant way to convert string into array (spread operator)
 * 2: map will run a funcion for every item in the array
 * 3: the provided function takes two arguments: item value and item index
 * 4: modulus 2: dividing the index by 2 and getting the rest we get an infinite 0, 1, 0, 1, 0, 1....
 * 5, 6: upper or lower case the character depending on the modulus
 * 7: converts the resulting array back to a string
 */
console.log(result) // mY RaNdOm pHrAsE