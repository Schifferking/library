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

class Placeholder {
  booksContainer = document.querySelector(".books-container");
  formContainer = document.querySelector(".form-container");
  form = document.querySelector("form");
  cancelButton = document.querySelector(".toggle-button");
  newBookButton = document.querySelector(".new-book");
}

let myLibrary = new Library();
let placeholder = new Placeholder();

// DELETE THESE LATER
const booksContainer = document.querySelector(".books-container");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector("form");
const cancelButton = document.querySelector(".toggle-button");
const newBookButton = document.querySelector(".new-book");
/*let myLibrary = [];*/
/*prefillLibrary();
displayLibrary();*/
addClickEventToButtons();
addFormEvent();

function prefillLibrary() {
  const mistborn = new Book('Mistborn: The Final Empire', 'Brandon Sanderson', 541, true);
  const phm = new Book('Project Hail Mary', 'Andy Weir', 491, true);
  const guards = new Book('Guards! Guards!', 'Terry Pratchet', 416, false);
  addBookToLibrary(mistborn);
  addBookToLibrary(phm);
  addBookToLibrary(guards);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  let index = 0;
  // changed this
  for (let book of myLibrary.books) {
    bookCard = createBookCard();
    addBookProperties(book, bookCard, index);
    createToggleBookButton(bookCard);
    createDeleteBookButton(bookCard);
    addbookCard(booksContainer, bookCard);
    index++;
  }
}

function createBookCard() {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  return bookCard;
}

function setIndexToCard(bookCard, index) {
  bookCard.setAttribute("data-index", index);
}

function addBookProperties(book, bookCard, index) {
  setIndexToCard(bookCard, index);
  for (const property in book) {
    if (property === "toggleRead") continue;
    let bookProperty = createBookPropertyElement(property, book[property]);
    addPropertyToCard(bookProperty, bookCard);
  }
}

function createBookPropertyElement(propertyName, propertyValue) {
  switch(propertyName) {
    case 'title':
      return createBookProperty(propertyName, propertyValue, 'h2');
    default:
      return createBookProperty(propertyName, propertyValue, 'p');
  }
}

function createBookProperty(property_name, property_value, element) {
  const bookAttributePara = document.createElement(element);
  const bookAttributeNode = document.createTextNode(`${capitalizeWord(property_name)}: ${property_value}`);
  bookAttributePara.appendChild(bookAttributeNode);
  return bookAttributePara;
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function addPropertyToCard(bookProperty, bookCard) {
  bookCard.appendChild(bookProperty);
}

function addbookCard(booksContainer, bookCard) {
  booksContainer.appendChild(bookCard);
}

function createToggleBookButton(bookCard) {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  // Add classes and attribute
  label.classList.add("switch");
  toggleDisable(label);
  checkbox.setAttribute("type", "checkbox");
  span.classList.add("slider");
  // Add functionality to toggle button
  // changed this
  const book = myLibrary.books[Number(bookCard.getAttribute("data-index"))];
  checkbox.addEventListener("change", () => {book.toggleRead()});
  bookCard.appendChild(label);
  label.appendChild(checkbox);
  label.appendChild(span);
}

function createDeleteBookButton(bookCard) {
  const deleteBookButton = document.createElement("button");
  deleteBookButton.classList.add("delete-button");
  deleteBookButton.textContent = "Delete book";
  toggleDisable(deleteBookButton);
  deleteBookButton.addEventListener("click", deleteBook);
  bookCard.appendChild(deleteBookButton);
}

function deleteBook() {
  const bookCard = this.parentElement;
  bookIndex = bookCard.getAttribute("data-index");
  //changed this
  myLibrary.books.splice(Number(bookIndex), 1);
  bookCard.remove();
  updateIndexes();
}

function updateIndexes() {
  let index = 0;
  for (bookCard of document.querySelectorAll(".book-card")) {
    setIndexToCard(bookCard, index);
    index++;
  }
}

function addClickEventToButtons() {
  cancelButton.addEventListener("click", disableButtons);
  newBookButton.addEventListener("click", disableButtons);
}

function disableButtons() {
  const toggles = document.querySelectorAll(".switch");
  const buttons = document.querySelectorAll(".book-card > button");
  const newBookButton = document.querySelector("#new-book");
  toggleFormContainer();
  for (let toggle of toggles)
    toggleDisable(toggle);
  for (let button of buttons)
    toggleDisable(button);
  toggleDisable(newBookButton);
}

function toggleDisable(button) {
  button.classList.toggle("disabled");
  button.disabled = button.disabled === true ? false : true;
}

function toggleFormContainer() {
  formContainer.classList.toggle("hidden");
}

function addFormEvent() {
  form.addEventListener("submit", function(event) {
    const bookData = getFormData();
    const bookCard = createBookCard();
    const newBook = new Book(bookData[0], bookData[1], bookData[2], bookData[3]);
    // changed the next two lines
    myLibrary.addBookToLibrary(newBook);
    addBookProperties(newBook, bookCard, myLibrary.books.length - 1);
    createToggleBookButton(bookCard);
    createDeleteBookButton(bookCard);
    addbookCard(booksContainer, bookCard);
    event.preventDefault();
  });
}

function getFormData() {
  const bookTitle = document.querySelector("[name='book-title']").value;
  const bookAuthor = document.querySelector("[name='book-author']").value;
  const bookPages = Number(document.querySelector("[name='book-pages']").value);
  const bookRead = document.querySelector("[name='book-read']").checked;
  return [bookTitle, bookAuthor, bookPages, bookRead];
}
