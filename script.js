let myLibrary = [];

addBookToLibrary("Book 1", "Author 1", 111, false);
addBookToLibrary("Book 2", "Author 2", 432, true);
addBookToLibrary("Book 3", "Author 3", 567, false);
addBookToLibrary("Book 4", "Author 2", 4152, false);
displayLibrary();
handleClick();

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, 
    ${this.pages} pages, ${this.isReadInfo()}`;
  };
  this.isReadInfo = function () {
    return isRead ? "is read" : "not read yet";
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayLibrary() {
  const bookList = document.querySelector("#book-list");
  bookList.textContent = "";
  myLibrary.forEach((book) => {
    const bookRow = document.createElement("tr");
    const bookTitle = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookPages = document.createElement("td");
    const bookIsRead = document.createElement("td");
    const bookDelete = document.createElement("td");
    const bookIsReadButton = document.createElement("button");
    const bookDeleteButton = document.createElement("button");
    const bookIsReadButtonIcon = document.createElement("i");
    const bookDeleteButtonIcon = document.createElement("i");

    book.isRead === false
      ? bookIsReadButtonIcon.classList.add("fa-solid", "fa-circle-xmark")
      : bookIsReadButtonIcon.classList.add("fa-solid", "fa-circle-check");
    bookDeleteButtonIcon.classList.add("fa-solid", "fa-trash-can");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;

    bookList.appendChild(bookRow);
    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(bookIsRead);
    bookRow.appendChild(bookDelete);
    bookIsRead.appendChild(bookIsReadButton);
    bookDelete.appendChild(bookDeleteButton);
    bookIsReadButton.appendChild(bookIsReadButtonIcon);
    bookDeleteButton.appendChild(bookDeleteButtonIcon);
  });
}

function validateForm(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const titleError = document.querySelector(".title");
  const authorInput = document.querySelector("#author");
  const authorError = document.querySelector(".author");
  const pagesInput = document.querySelector("#pages");
  const pagesError = document.querySelector(".pages");
  const isReadInput = document.querySelector("#is-read");

  titleError.style.display = titleInput.value === "" ? "block" : "none";
  authorError.style.display = authorInput.value === "" ? "block" : "none";
  if (
    pagesInput.value === "" ||
    pagesInput.value.match(/[^1-9]/) ||
    pagesInput.value <= 0
  ) {
    pagesError.style.display = "block";
  } else {
    pagesError.style.display = "none";
  }
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== "" &&
    pagesInput.value > 0
  ) {
    const isRead = isReadInput.checked ? true : false;
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      isRead
    );
    form.reset();
  }
}

function displayModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "block";
  modal.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("close")) {
      modal.style.display = "none";
    } else if (target.classList.contains("confirm-removal")) {
      myLibrary = [];
      modal.style.display = "none";
    }
  });
}

function handleClick() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const bookIndex = target.parentNode.parentNode.parentNode.rowIndex - 1;
    if (target.id === "add-book") {
      validateForm(event);
    } else if (target.id === "delete-all") {
      displayModal();
    } else if (target.classList.contains("fa-circle-check")) {
      target.classList.remove("fa-circle-check");
      myLibrary[bookIndex].isRead = false;
    } else if (target.classList.contains("fa-circle-xmark")) {
      target.classList.remove("fa-circle-xmark");
      myLibrary[bookIndex].isRead = true;
    } else if (target.classList.contains("fa-trash-can")) {
      myLibrary.splice(bookIndex, 1);
    }
    displayLibrary();
  });
}
