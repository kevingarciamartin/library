const myLibrary = [];

class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
      const isReadMessage = isRead ? "is read" : "not read yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadMessage}`;
    };
  }
}

function addBookToLibrary(title, author, pages, isRead = false) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}
