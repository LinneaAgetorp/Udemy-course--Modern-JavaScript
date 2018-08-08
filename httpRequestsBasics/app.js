// First request-lecture
// document.getElementById('button').addEventListener('click', loadData);
//
// function loadData() {
//     //Create XHR object
//     const xhr = new XMLHttpRequest();
//
//     //OPEN (what sort of request, what file, async T/F)
//     xhr.open('GET', 'data.txt', true);
//
//     //Can be used for loaders/spinners
//     xhr.onprogress = function(){
//         console.log('readystate', xhr.readyState)
//     };
//
//     xhr.onerror= () => {
//         console.log('request error...')
//     }
//
//     xhr.onload = function () {
//         if(this.status === 200) {
//             // console.log(this.responseText)
//             document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`
//         }
//     };
//
//     // finally, must call send to make it happen
//     xhr.send();
// }

document.getElementById('button1').addEventListener('click', loadCustomer);
document.getElementById('button2').addEventListener('click', loadCustomers);

function loadCustomer(e) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'customer.json', true);

    xhr.onload = function(){
        if(this.status === 200){
            // console.log(this.responseText)
            const customer = JSON.parse(this.responseText)
            const output =
                `<ul>
                    <li> ID: ${customer.id}</li>
                    <li> Name: ${customer.name}</li>
                    <li> Company: ${customer.company}</li>
                    <li> Phone: ${customer.phone}</li>
                </ul>`;

            document.getElementById('customer').innerHTML = output;
        }
    };

    xhr.send();
}


function loadCustomers(e) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'customers.json', true);

    xhr.onload = function(){
        if(this.status === 200){
            // console.log(this.responseText)
            const customers = JSON.parse(this.responseText)
            let output = '';
            customers.forEach(customer=>{
                output +=
                    `<ul>
                    <li> ID: ${customer.id}</li>
                    <li> Name: ${customer.name}</li>
                    <li> Company: ${customer.company}</li>
                    <li> Phone: ${customer.phone}</li>
                </ul>`;

                document.getElementById('customers').innerHTML = output;
            })

        }
    }

    xhr.send();
}

// ---------------------------            Callback lecture: (SYNC)


//
// const posts = [
//     {title: 'Post 1', body: 'This is post one'},
//     {title: 'Post 2', body: 'This is post two'},
// ];
//
// function createPost(post) {
//     setTimeout(()=> {
//         posts.push(post);
//     }, 2000)
// }
//
// function getPosts() {
//     setTimeout(()=> {
//         let output = '';
//         posts.forEach(post => {
//           output += `<li>${post.title}</li>`
//         });
//         document.body.innerHTML = output;
//     }, 1000)
// }
//
// createPost({title: 'Post 3', body: 'This is post three'});
//
// getPosts()



// -------------------------------          Callback version with ASYNC behaviour
//


// const posts = [
//     {title: 'Post 1', body: 'This is post one'},
//     {title: 'Post 2', body: 'This is post two'},
// ];
//
// function createPost(post, callback) {
//     setTimeout(()=> {
//         posts.push(post);
//         callback();
//     }, 2000)
// }
//
// function getPosts() {
//     setTimeout(()=> {
//         let output = '';
//         posts.forEach(post => {
//             output += `<li>${post.title}</li>`
//         });
//         document.body.innerHTML = output;
//     }, 1000)
// }
//
// createPost({title: 'Post 3', body: 'This is post three'}, getPosts);
//getPosts kan skickas in som parameter och anropas tack vare callback-parametern i createPost

// -------------------------           Same thing but with promise instead
const posts = [
    {title: 'Post 1', body: 'This is post one'},
    {title: 'Post 2', body: 'This is post two'},
];

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            posts.push(post);

            const error = false;
            if(!error) {
                resolve();
            } else {
                reject('Error: Something went wrong');
            }
        }, 2000)
    })


}

function getPosts() {
    setTimeout(()=> {
        let output = '';
        posts.forEach(post => {
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output;
    }, 1000)
}

createPost({title: 'Post 3', body: 'This is post three'})
    .then(getPosts)
    .catch((error) => {
        console.log(error)
    });

