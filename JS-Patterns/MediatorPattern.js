//                 -------------    MEDIATOR PATTERN

//Example chat room
class User {
    constructor(name) {
        this.name = name;
        this.chatroom = null;
    }

    send(message, to) {
        this.chatroom.send(message, this, to) //"this" syftar till user
    }

    receive(message, from) {
        document.querySelector('.msg').innerHTML +=
            `From ${from.name} to ${this.name}: ${message} <br/>`
    }
}


const Chatroom = function () {
    let users = {};     // list of users

    return {
        register: function (user) {
            users[user.name] = user;
            user.chatroom = this;
        },
        send: function (message, from, to) {
            if (to) {
                // Single user message
                to.receive(message, from)
            } else {
                // Mass message
                for (let key in users) {
                    if (users[key] !== from) {      // Makes sure we dont send it back to the sender
                        users[key].receive(message, from)
                    }
                }
            }
        }
    }
};

const brad = new User('Brad');
const jeff = new User('Jeff');
const john = new User('John');

const chatroom = new Chatroom();

chatroom.register(brad)
chatroom.register(jeff)
chatroom.register(john)

brad.send('hello jeff', jeff)
jeff.send('helo brad', brad)
john.send('hello everyone!!!')
john.send('how are you?')