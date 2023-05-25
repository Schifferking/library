let myLibrary = [];
prefillLibrary();
displayLibrary();

function prefillLibrary() {
  const mistborn = new Book('Mistborn: The Final Empire', 'Brandon Sanderson', 541, true);
  const phm = new Book('Project Hail Mary', 'Andy Weir', 491, true);
  const guards = new Book('Guards! Guards!', 'Terry Pratchet', 416, false);
  addBookToLibrary(mistborn);
  addBookToLibrary(phm);
  addBookToLibrary(guards);
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  const booksContainer = getBooksContainer();
  for (book of myLibrary) {
    bookCard = createBookCard();
    addBookProperties(book, bookCard);
    addbookCard(booksContainer, bookCard)
  }
}

function getBooksContainer() {
  return document.getElementById("books-container");
}

function createBookCard() {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  return bookCard;
}

function addBookProperties(book, bookCard) {
  for (const property in book) {
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
