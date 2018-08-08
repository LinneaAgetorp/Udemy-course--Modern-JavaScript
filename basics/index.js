
//testing if id exists by matching typeof - undefined
if(typeof id !== 'undefined') {
    console.log(`id is ${id}`)
} else {
    console.log('no ID')
}

// immediately invokable function expressions, iife's, anropas direkt
(function(name) {
  console.log(`hello ${name}`)
})('kalle')

const todo = {
    add: ()=> {
        console.log('todo')
    }
}

// skapa och lägg till ny metod till objektet
todo.delete = ()=> {
    console.log('delete todo')
}
todo.delete()
todo.add()

//prompt
// const input = prompt()
//
// console.log(input)

let val;
val = window.navigator.platform;
console.log(val)