document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJSON);

document.getElementById('button3').addEventListener('click', getExternal);

function getText(e) {
    e.preventDefault()

    fetch('test.txt')
        .then((response) => response.text())
        .then((data) => document.getElementById('output').innerHTML = data)
        .catch((err) => console.log(err))
}

function getJSON(e) {
    e.preventDefault()

    fetch('posts.json')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            let output = '';
            data.forEach(post => {
                output += `<li>Title: ${post.title}<br/> Content: ${post.body}</li>`
            });
            document.getElementById('output').innerHTML = output
        })
        .catch((err) => {
            console.log(err)
        })
}

function getExternal(e) {
    e.preventDefault()

    fetch('https://api.github.com/users')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let output = '';
            data.forEach(user => {
                output += `<li>Username: ${user.login}</li>`
            });
            document.getElementById('output').innerHTML = output
        })
        .catch((err) => console.log(err))
}