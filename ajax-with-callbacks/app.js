// const http = new easyHTTP;

// gets posts from library-file, asynchronous with callback
// http.get('https://jsonplaceholder.typicode.com/posts', (error, response) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(response)
//     }
// })

// Get single post
// http.get('https://jsonplaceholder.typicode.com/posts/1', (error, response) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(response)
//     }
// })

// const data = {
//     title: 'Custom Post',
//     body: 'This is a custom post'
// };

// POST request, create new post
// http.post('https://jsonplaceholder.typicode.com/posts', data, (error, post) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(post)
//     }
// })

// PUT request, update post
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, (error, post) => {
//     if(error){
//         console.log(error)
//     } else {
//         console.log(post)
//     }
// })


// DELETE request
// http.delete('https://jsonplaceholder.typicode.com/posts/3', (error, response) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(response)
//     }
// });

// ----------  -------------      ES6 Version
const http = new EasyHTTP;

//User data
const data = {
    name: 'John Doe',
    email: 'jdoe@mail.com'
}

// http.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//
// http.post('https://jsonplaceholder.typicode.com/users', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// PUT
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// delete
http.delete('https://jsonplaceholder.typicode.com/users/2')
    .then((data) => console.log(data))
    .catch(err => console.log(err))