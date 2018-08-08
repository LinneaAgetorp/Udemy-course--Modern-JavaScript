class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    };

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
}

//Local Storage class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => {
            const ui = new UI();
            ui.addBookToList(book)
        })
    }

    static addBook(book) {
     const books = Store.getBooks();
     books.push(book);

     localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}

//Event listener DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

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
        ui.addBookToList(book);
        Store.addBook(book);

        ui.clearFields();
        ui.showAlert('Book Added', 'success')
    }
});

// Event listener for delete btn
document.querySelector('#book-list').addEventListener('click', function (e) {
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target);

    //remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Book Removed', 'success');
})
