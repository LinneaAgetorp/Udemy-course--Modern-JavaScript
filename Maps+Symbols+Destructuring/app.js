//                         ---------  SETS -------------

const set1 = new Set();

//Add values to set
set1.add(100);
set1.add('A string');
set1.add({name: 'John'});
set1.add(true);
set1.add(100);          // Only unique values, this one will not be set.

// init new set + add values at the same time
const set2 = new Set([1, true, 'string']);

 console.log(set1, set2);
//
// // Get count
// console.log(set1.size);
//
// // Check for values
// console.log(set1.has(100))      // Output true
// console.log(set1.has(50 + 50))  // Output true
// console.log(set1.has({name: 'John'})) // Output false, object is not the exact same, points to a different place in memory
//
// // Delete from set
// set1.delete(100)
// console.log(set1)

// ITERATING THROUGH SETS
// For...of
for(let item of set1) {
    console.log(item)
}

// forEach
set1.forEach((value)=>{
    console.log(value)
})

// Convert to array
const setArr = Array.from(set1);
console.log(setArr)


//                         ---------  MAPS -------------

// Maps = key-value pairs - can use ANY type as a key or value
// const map1 = new Map();
//
// //Set keys
// const key1 = 'some string';
// const key2 = {};
// const key3 = ()=>{};
//
// // Set map values by key
// map1.set(key1, 'Value of key1')
// map1.set(key2, 'Value of key2')
// map1.set(key3, 'Value of key3')

// Get values by key
// console.log(map1.get(key1), map1.get(key2), map1.get(key3))
//
// // Count values
// console.log(map1.size)

// ITERATING MAPS
// Loop using for...of to get keys and values
// for(let [key, value] of map1) {
//      console.log(`${key} = ${value}`)
// }

// Iterate keys only
// for(let key of map1.keys()) {
//     console.log(key)
// }

// Iterate values only
// for(let value of map1.values()) {
//     console.log(value)
// }

// Iterate using forEach
// map1.forEach((value, key) => {
//     console.log(`${key} = ${value}`)
// })

//          ------------        CONVERT TO ARRAYS
// Create an array of the key value pairs
// const keyValArr = Array.from(map1);
// console.log(keyValArr);

// const valArr = Array.from(map1.values())
//
// const keyArr = Array.from(map1.keys())
//
// console.log(valArr, keyArr)



//                         ---------  SYMBOLS ----------

// Create a symbol
// const sym1 = Symbol();
// const sym2 = Symbol('sym2');

// console.log(sym2) // pure primitive type

// No two symbols can be the same
// console.log(Symbol('123') === Symbol('123')) // output false


// // Unique Object Keys
// const key1 = Symbol();
// const key2 = Symbol('sym2');
//
//
// const myObj = {};
//
// myObj[key1] = 'Prop1' // must use brackets to "reach" the actual Symbol-variable key1, otherwise it's just a prop.
// myObj[key2] = 'Prop2'
// myObj.key3 = 'Prop3'
// myObj.key4 = 'Prop4'
//
//
// // console.log(myObj)
//
// // Symbols are not enumerable in for...in
// for(let i in myObj) {
//     console.log(`${i}: ${myObj[i]}`)
// }

//Symbols are ignored by JSON.stringify



//                          ---------  DESTRUCTURING ----------
// Destructuring Assignment
let a, b;
[a, b] = [100, 200];

// Rest pattern
[a, b, ...rest] = [100, 200, 300, 400, 500];    // ... assigns the rest of the items to the "rest"-variable

({ a, b, ...rest} = { a: 100, b: 200, c: 300, d:400, e: 500})


//      -------- Array destructuring

// const people = ['John', 'Beth', 'Mike']
// const [person1, person2, person3] = people


// Parse Array returned from function
// function getPeople() {
//     return ['John', 'Beth', 'Mike']
// }
//
// let person1, person2, person3;
//     [person1, person2, person3] = getPeople();
//
// console.log(person1, person2, person3);


//      ------- Object Destructuring

// const person = {
//     name: 'John Doe',
//     age: 32,
//     city: 'Miami',
//     gender: 'male',
//     sayHello: ()=> {
//         console.log('Hello')
//     }
// }
//
// // Old ES5:
// // const name = person.name,
// //     age = person.age,
// //     city = person.city;
//
// // Destructuring new ES6
// const {name, age, city, sayHello} = person
// console.log(name, age, city)
//
// sayHello();