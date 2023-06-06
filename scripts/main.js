class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  toggleRead() {
    this.read = this.read === true ? false: true;
  }
}

class Library {
  books = [];

  addBookToLibrary(book) {
    this.books.push(book);
  }

  get books() {
    return this.books;
  }
}

class displayController {
  booksContainer = document.querySelector(".books-container");
  formContainer = document.querySelector(".form-container");
  form = document.querySelector("form");
  cancelButton = document.querySelector(".toggle-button");
  newBookButton = document.querySelector(".new-book");

  toggleFormContainer() {
    this.formContainer.classList.toggle("hidden");
  }

  toggleDisabled (button) {
    button.classList.toggle("disabled");
    button.disabled = button.disabled === true ? false : true;
  }

  disableButtons () {
    const toggles = document.querySelectorAll(".switch");
    const buttons = document.querySelectorAll(".book-card > button");
    const newBookButton = document.querySelector(".new-book");
    this.toggleFormContainer();
    for (let toggle of toggles)
      this.toggleDisabled(toggle);
    for (let button of buttons)
      this.toggleDisabled(button);
    this.toggleDisabled(newBookButton);
  }

  addClickEventToButtons() {
    let dcDisableButtons = myDisplayCrontroller.disableButtons.bind(myDisplayCrontroller);
    this.cancelButton.addEventListener("click", dcDisableButtons);
    this.newBookButton.addEventListener("click", dcDisableButtons);
  }

  getFormData() {
    const bookTitle = document.querySelector("[name='book-title']").value;
    const bookAuthor = document.querySelector("[name='book-author']").value;
    const bookPages = Number(document.querySelector("[name='book-pages']").value);
    const bookRead = document.querySelector("[name='book-read']").checked;
    return [bookTitle, bookAuthor, bookPages, bookRead];
  }

  createBookCard() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    return bookCard;
  }

  setIndexToCard(bookCard, index) {
    bookCard.setAttribute("data-index", index);
  }

  capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  createBookProperty(property_name, property_value, element) {
    const bookAttributePara = document.createElement(element);
    const bookAttributeNode = document.createTextNode(`${this.capitalizeWord(property_name)}: ${property_value}`);
    bookAttributePara.appendChild(bookAttributeNode);
    return bookAttributePara;
  }

  createBookPropertyElement(propertyName, propertyValue) {
    switch(propertyName) {
      case 'title':
        return this.createBookProperty(propertyName, propertyValue, 'h2');
      default:
        return this.createBookProperty(propertyName, propertyValue, 'p');
    }
  }

  addPropertyToCard(bookProperty, bookCard) {
    bookCard.appendChild(bookProperty);
  }

  addBookProperties(book, bookCard, index) {
    this.setIndexToCard(bookCard, index);
    for (const property in book) {
      if (property === "toggleRead") 
        continue;
      let bookProperty = this.createBookPropertyElement(property, book[property]);
      this.addPropertyToCard(bookProperty, bookCard);
    }
  }

  createToggleBookButton(bookCard) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    // Add classes and attribute
    label.classList.add("switch");
    this.toggleDisabled(label);
    checkbox.setAttribute("type", "checkbox");
    span.classList.add("slider");
    // Add functionality to toggle button
    const book = myLibrary.books[Number(bookCard.getAttribute("data-index"))];
    checkbox.addEventListener("change", () => {book.toggleRead()});
    bookCard.appendChild(label);
    label.appendChild(checkbox);
    label.appendChild(span);
  }

  updateIndexes() {
    let index = 0;
    for (let bookCard of document.querySelectorAll(".book-card")) {
      this.setIndexToCard(bookCard, index);
      index++;
    }
  }

  deleteBook(bookCard) {
    let bookIndex = bookCard.getAttribute("data-index");
    myLibrary.books.splice(Number(bookIndex), 1);
    bookCard.remove();
    this.updateIndexes();
  }

  createDeleteBookButton(bookCard) {
    const deleteBookButton = document.createElement("button");
    deleteBookButton.classList.add("delete-button");
    deleteBookButton.textContent = "Delete book";
    this.toggleDisabled(deleteBookButton);
    let dcDeleteBook = myDisplayCrontroller.deleteBook.bind(myDisplayCrontroller);
    deleteBookButton.addEventListener("click", () => dcDeleteBook(bookCard));
    bookCard.appendChild(deleteBookButton);
  }

  addbookCard(booksContainer, bookCard) {
    booksContainer.appendChild(bookCard);
  }

  formHandler(event) {
    const bookData = this.getFormData();
    const bookCard = this.createBookCard();
    const newBook = new Book(bookData[0], bookData[1], bookData[2], bookData[3]);
    myLibrary.addBookToLibrary(newBook);
    this.addBookProperties(newBook, bookCard, myLibrary.books.length - 1);
    this.createToggleBookButton(bookCard);
    this.createDeleteBookButton(bookCard);
    this.addbookCard(this.booksContainer, bookCard);
    event.preventDefault();
  }

  addFormEvent() {
    let dcFormHandler = myDisplayCrontroller.formHandler.bind(myDisplayCrontroller);
    this.form.addEventListener("submit", dcFormHandler);
  }

  addListeners() {
    this.addClickEventToButtons();
    this.addFormEvent();
  }
}

let myLibrary = new Library();
let myDisplayCrontroller = new displayController();

myDisplayCrontroller.addListeners();
