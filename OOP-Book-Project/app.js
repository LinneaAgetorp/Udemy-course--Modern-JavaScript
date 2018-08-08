// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}


UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    //Create element
    const row = document.createElement('tr');
    row.innerHTML =
        `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete"> X </a></td>
        `;
    list.appendChild(row)
};

UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form)

    setTimeout(()=> {
        document.querySelector('.alert').remove()
    }, 3000)
};

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault()

    //Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiating a book
    const book = new Book(title, author, isbn)

    //Instantiate UI
    const ui = new UI()

    //Validate
    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        ui.addBookToList(book)

        ui.clearFields()
        ui.showAlert('Book Added', 'success')
    }
});

// Event listener for delete btn
document.querySelector('#book-list').addEventListener('click', function (e) {
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book Removed', 'success');
})