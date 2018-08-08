// Basic structure

// IIFE - immediately invoked function expression, produces lexical scope. Why? Privacy. Avoids "polluting global name space"
//                                                                              and accidentally invoke function afterwards
// (function () {
//         // Declare private vars and functions
//
//     return {
//         // Declare public vars and functions, so this stuff here you can reach "from the outside"
//     }
// })();


//               -----------    STANDARD MODULE PATTERN
// const UICtrl = (function () {
//     let text = 'Hello world!';
//
//     const changeText = function () {        // Everything in this module is private
//         const element = document.querySelector('h1');
//         element.textContent = text;
//     };
//
//     return {                            // Return -> Makes it public
//         callChangeText: function () {
//             changeText();
//             console.log(text)
//         }
//     }
// })();
//
// UICtrl.callChangeText();


//              -------------    REVEALING MODULE PATTERN

// const ItemCtrl = (function () {
//    let data = [];
//
//    function add(item) {
//        data.push(item)
//        console.log('Item added...')
//    }
//
//    function get(id) {
//        return data.find(item => {
//            return item.id === id
//        })
//    }
//
//    return {
//        add: add,
//        get: get
//    }
// })();
//
// ItemCtrl.add({id: 1, name: 'John'});
//
// console.log(ItemCtrl.get(1));



//                 -------------    SINGLETON PATTERN

//can only be instantiated once (example, logged in user - only one at a time) GLOBAL

// const Singleton = (function () {
//     let instance;
//
//     function createInstance() {
//         const object = new Object({ name: 'Brad' });
//         return object
//     }
//     return {
//         getInstance: function () {
//             if(!instance) {
//                 instance = createInstance();
//             }
//             return instance
//         }
//     }
// })();
//
// const instanceA = Singleton.getInstance();
// const instanceB = Singleton.getInstance();
//
// console.log(instanceA === instanceB) // output true (they're the same)



//                 -------------    FACTORY PATTERN

function MemberFactory() {
    this.createMember = function (name, type) {
        let member;

        if(type === 'simple'){
            member = new SimpleMembership(name)
        } else if(type === 'standard') {
            member = new StandardMembership(name)
        } else if(type === 'super') {
            member = new SuperMembership(name)
        }

        member.type = type;

        member.define = function () {
            console.log(`${this.name} (${this.type}): ${this.cost}`);
        };
        return member;
    }
}

const SimpleMembership = function (name) {
    this.name = name;
    this.cost = '5$';
}

const StandardMembership = function (name) {
    this.name = name;
    this.cost = '15$';
}

const SuperMembership = function (name) {
    this.name = name;
    this.cost = '25$';
}

const members = [];

const factory = new MemberFactory();

members.push(factory.createMember('John Doe', 'simple'));
members.push(factory.createMember('Jane Doe', 'simple'));
members.push(factory.createMember('Chris Jackson', 'super'));
members.push(factory.createMember('John Clarkson', 'standard'));

// console.log(members)

// members.forEach(member => {
//     member.define()
// })



//                 -------------    OBSERVER PATTERN

// function EventObserver() {
//     this.observers = [];
// }
//
// EventObserver.prototype = {
//     subscribe: function (fn) {
//         this.observers.push(fn);
//         console.log('You subscribed to ' + fn.name)
//     },
//     unsubscribe: function (fn) {
//         this.observers = this.observers.filter((item) => {
//             if(item !== fn) {
//                 return item
//             }
//         });
//         console.log('you are now unsubscribed')
//     },
//     fire: function () {
//         this.observers.forEach(item => {
//             item.call();
//         })
//     }
// }
//
// const click = new EventObserver();
//
// // Event listeners
// document.querySelector('.sub-s').addEventListener('click', ()=> {
//     click.subscribe(getCurrMilliseconds)
// });
//
// document.querySelector('.unsub-s').addEventListener('click', ()=> {
//     click.unsubscribe(getCurrMilliseconds)
// });
//
// document.querySelector('.fire').addEventListener('click', ()=> {
//     click.fire()
// });
//
//
// // Click handler
// const getCurrMilliseconds = function () {
//     console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`)
// }

