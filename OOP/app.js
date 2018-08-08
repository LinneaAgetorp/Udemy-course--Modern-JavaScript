// function Person(firstName, lastName, dob){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.birthday = new Date(dob);
//     // this.calculateAge = ()=> {
//     //     const diff = Date.now() - this.birthday.getTime();
//     //
//     //     const ageDate = new Date(diff);
//     //     return Math.abs(ageDate.getUTCFullYear()- 1970)
//     // }
// }
//
// //Calculate age
// Person.prototype.calculateAge = function () {
//
//     const diff = Date.now() - this.birthday.getTime();
//
//     const ageDate = new Date(diff);
//     return Math.abs(ageDate.getUTCFullYear()- 1970)
// }
//
// Person.prototype.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`
// }
//
// const brad = new Person('brad', 'smith', '9-10-1981');
// console.log(brad.calculateAge());
//
// const linnea = new Person('linnea', 'agetorp', '1/20/1990')
// console.log(linnea, linnea.calculateAge());
// console.log(linnea.getFullName());
//
// Person.prototype.greeting = function () {
//     return `Hello there ${this.firstName} ${this.lastName}`
// }
//
// console.log(linnea.greeting())
//
// function Customer(firstName, lastName, phone, membership) {
//     Person.call(this, firstName, lastName);
//     this.phone = phone;
//     this.membership = membership;
// }
//
// Customer.prototype = Object.create(Person.prototype)
// Customer.prototype.constructor = Customer
//
// Customer.prototype.greeting = function () {
//     return `Hello there ${this.firstName} ${this.lastName}, welcome to our company`
// }
//
// const customer1 = new Customer('Tom', 'Haverford', '123-123-123', 'standard')
// console.log(customer1)
// console.log(customer1.greeting())
//
//
// const personPrototypes = {
//     greeting: function () {
//         return `Hello there ${this.firstName} ${this.lastName}`
//     },
//     getsMarried: function (newLastName) {
//         this.lastName = newLastName
//     }
// }
//
// const mary = Object.create(personPrototypes)
// mary.firstName = 'Mary';
// mary.lastName = 'Williams';
// mary.age = 30;
//
// mary.getsMarried('Thompson')
// console.log(mary, mary.greeting())
//
// const bradd = Object.create(personPrototypes, {
//     firstName: {value: 'Bradd'},
//     lastName: {value: 'Traversy'},
//     age: {value: 36}
// })
//
// console.log(bradd)
// console.log(bradd.greeting())


// ------------------                       CLASSES

class Person {
    constructor(firstName, lastName, dob){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = new Date(dob)
    }

    greeting() {
        return `Hello there ${this.firstName} ${this.lastName}`
    }

    calculateAge() {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() -1970)
    }

    getsMarried(newLastName){
        this.lastName = newLastName
    }

    static addNumber (x, y){
        return x+y;
    }
}


console.log(Person.addNumber(3, 4))
const mary = new Person('Mary', 'Williams', '11-13-1980');
mary.getsMarried('Harris')
console.log(mary.greeting())
console.log(mary.calculateAge())


class Customer extends Person {
    constructor(firstName, lastName, phone, membership) {
        //super calls parent-class' constructor
        super(firstName, lastName);

        this.phone = phone;
        this.membership = membership
    }
    static getMembershipCost() {
        return 500;
    }
}

const john = new Customer('John', 'Doe', '123-123-123', 'standard');

console.log(john.greeting())
console.log(Customer.getMembershipCost())