
//                 -------------    OBSERVER PATTERN ES6 way, with classes

class EventObserver {
    constructor(){
        this.observers = [];
    };
    subscribe (fn) {
        this.observers.push(fn);
        console.log('You subscribed to ' + fn.name)
    };
    unsubscribe (fn) {
        this.observers = this.observers.filter((item) => {
            if(item !== fn) {
                return item
            }
        });
        console.log('you are now unsubscribed')
    };
    fire () {
        this.observers.forEach(item => {
            item.call();
        })
    };
}



const click = new EventObserver();

// Event listeners
document.querySelector('.sub-s').addEventListener('click', ()=> {
    click.subscribe(getCurrMilliseconds)
});

document.querySelector('.unsub-s').addEventListener('click', ()=> {
    click.unsubscribe(getCurrMilliseconds)
});

document.querySelector('.fire').addEventListener('click', ()=> {
    click.fire()
});


// Click handler
const getCurrMilliseconds = function () {
    console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`)
}

