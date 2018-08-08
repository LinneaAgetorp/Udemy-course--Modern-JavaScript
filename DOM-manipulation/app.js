//  ---------      select elements from DOM:
//
// let listItems = document.querySelectorAll('.collection-item');
//
// // gör HTML collection till array, behövs inte med querySelectorAll (NodeList), men behövs med getElementsByClassName och TagName
// //listItems = Array.from(listItems)
//
//
// listItems.forEach((item) => {
//     item.style.color = '#555'
// });
//
// const oddItems = document.querySelectorAll('li:nth-child(odd)');
//
// oddItems.forEach((item) => {
//     item.style.background = '#ccc'
// })
//
// const list = document.querySelector('ul.collection')
//
// let val;
//
// // .children ger elementen endast, childNodes ger alla noder (line breaks, comments, osv)
// val = list.children
//
// console.log(val)

//kan targeta children.children, parentElement, siblingElement nextSiblingElement och previousSiblingElement osv


// -----     create elements:
//
// const li = document.createElement('li');
//
// li.className = 'collection-item';
//
// li.setAttribute('title', 'New Item');
//
// li.appendChild(document.createTextNode('Hello'))
//
// const link = document.createElement('a');
// link.className = 'delete-item secondary-content';
// link.innerHTML = '<i class="fa fa-remove"></i>';
// li.appendChild(link);
//
// document.querySelector('ul.collection').appendChild(li)
//
// console.log(li)



// ------ replace and remove elements

// const newHeading = document.createElement('h2');
// newHeading.id = 'task-title'
// newHeading.appendChild(document.createTextNode('Task List'))
//
// const oldHeading = document.getElementById('task-title')
// const cardAction = document.querySelector('.card-action')
// cardAction.replaceChild(newHeading, oldHeading)
//
// console.log(newHeading)

// document.querySelector('.clear-tasks').addEventListener('click', onClick)
//
// function onClick(e){
//     e.preventDefault();
//     console.log('clicked')
// }


// document.querySelector('.clear-tasks').addEventListener('click', (e)=> {
//     e.preventDefault();
//     console.log('hello')
// })


//    ----------     Event handlers

// const clearBtn = document.querySelector('.clear-tasks');
// const card = document.querySelector('.card');
// const heading = document.querySelector('h5');

// clearBtn.addEventListener('click', runEvent)
// clearBtn.addEventListener('dblclick', runEvent)
// clearBtn.addEventListener('mousedown', runEvent)
// clearBtn.addEventListener('mouseup', runEvent)
// clearBtn.addEventListener('mouseenter', runEvent)
//
// card.addEventListener('mousemove', runEvent)
//
// function runEvent(e) {
//     e.preventDefault()
//     console.log(`event type: ${e.type}`)
//     heading.textContent = `MouseX: ${e.offsetX}, MouseY: ${e.offsetY}`
//     document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`
// }


//    --------  INPUT, forms
//
// const form = document.querySelector('#task-form');
// const taskInput = document.getElementById('task');
//
// taskInput.value='';
//
// function runEvent(e) {
//     e.preventDefault()
//     console.log(`event type: ${e.type}`)
//     console.log(taskInput.value)
// }
//
// form.addEventListener('submit', runEvent)


//   ---------  EVENT BUBBLE

document.querySelector('.card-title').addEventListener('click', ()=> {
    console.log('card title')
})

// document.querySelector('.card-content').addEventListener('click', ()=> {
//     console.log('card content')
// })

// document.querySelector('.card').addEventListener('click', ()=> {
//     console.log('card')
// })

document.querySelector('.col').addEventListener('click', ()=> {
    console.log('col')
})