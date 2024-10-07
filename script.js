const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${
      this.pages
    } pages, ${this.isReadInfo()}`;
  };
  this.isReadInfo = function () {
    return isRead ? "is read" : "not read yet";
  };
}

addBookToLibrary("Book 1", "Author 1", "123", false);
addBookToLibrary("Book 2", "Author 2", "432", true);
addBookToLibrary("Book 3", "Author 3", "567", false);
displayLibrary();

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayLibrary() {
  const bookList = document.querySelector("#table-body");
  myLibrary.forEach((book) => {
    const bookRow = document.createElement("tr");
    const bookTitle = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookPages = document.createElement("td");
    const bookIsRead = document.createElement("td");
    const bookDelete = document.createElement("td");
    const bookIsReadButton = document.createElement("button");
    const bookDeleteButton = document.createElement("button");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookIsReadButton.textContent = book.isReadInfo();
    bookDeleteButton.textContent = "X";

    bookList.appendChild(bookRow);
    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(bookIsRead);
    bookRow.appendChild(bookDelete);
    bookIsRead.appendChild(bookIsReadButton);
    bookDelete.appendChild(bookDeleteButton);
  });
}
