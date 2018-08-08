const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners()

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function addTaskElements(task) {        //dåligt namngiven...
    const li = document.createElement('li');       //skapa ett LI-element
    li.className = 'collection-item';              //ge LI en klass
    li.appendChild(document.createTextNode(task)); //fyll LI med text

    const link = document.createElement('a');       // skapa ett a-element
    link.className = 'delete-item secondary-content'; // ge a en klass
    link.innerHTML = '<i class = "fa fa-remove"></i>'; //fyll a med <i>
    li.appendChild(link);                            // gör a-taggen till ett LI-barn

    taskList.appendChild(li);                        // lägg till LI till ul-elementet (listan)
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach((task) => {
            addTaskElements(task)
        })
    }

}

function addTask(e) {
    e.preventDefault()
    if (taskInput.value === '' || taskInput.value.includes('lazy')) {
        alert('Add a real task')
    } else {
        addTaskElements(taskInput.value)

        storeTaskInLS(taskInput.value)
    }

    taskInput.value = '';
}

function removeTask(e) {
    e.preventDefault()
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLS(taskItem) {
    let tasks;                                  // borde kanske vara separat funktion? repeteras tre gånger. Knepigt.
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function storeTaskInLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks() {
    // taskList.innerHTML = ''; Båda sätt fungerar, while-loopen något snabbare
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearTasksFromLS();
}

function clearTasksFromLS() {
    localStorage.clear()
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) === -1) {             //Om indexOf är -1 ska item inte synas
            task.style.display = 'none';
        } else {                                                // Else -> visa item
            task.style.display = 'block';
        }
    })
}