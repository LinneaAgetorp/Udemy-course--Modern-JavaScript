const user = {
    email: 'jdoe@gmail.com'
}


try {
    //Produce a ReferenceError
    // myFunction()

    // Produce TypeError
    // null.myFunction()

    //Produce SyntaxError
    // eval('Hello World')

    //Produce URIError
    // decodeURIComponent('%')

    if(!user.name) {
        // throw 'User has no name'
        throw new SyntaxError('User has no name')
    }

} catch(err) {
    console.log(`User error: ${err.message}`)
    // console.log(err)
    // console.log(err.message)
    // console.log(err instanceof ReferenceError)
} finally {
    //Runs no matter what
    console.log('Finally runs regardless of result...')
}

console.log('program continues...')