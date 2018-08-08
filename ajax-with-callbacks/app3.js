// async function myFunc() {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('hello')
//         }, 1000)
//     });
//
//     const error = true;
//     if(!error) {
//         const res = await promise //wait until promise is resolved
//         return res
//     } else {
//         await Promise.reject(new Error('Something went wrong'))
//     }
// }
//
// myFunc()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// async function getUsers() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//
//     const data = await response.json();
//
//     return data
// }
//
// getUsers()
// .then(res => console.log(res))

const data = {
    title: 'post one',
    body: 'this is post one'
};

const http = new EasyHTTP;

//          GET request
// http.get('https://jsonplaceholder.typicode.com/posts')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

//          POST request
// http.post('https://jsonplaceholder.typicode.com/posts', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

//          PUT request
// http.put('https://jsonplaceholder.typicode.com/posts/2', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

//          DELETE request
http.delete('https://jsonplaceholder.typicode.com/posts/2')
    .then((data) => console.log(data))
    .catch(err => console.log(err))

