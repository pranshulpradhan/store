// Function to fetch initial books from the API (with list_name)
async function fetchInitialBooks() {
    try {
        const response = await fetch("https://books-backend.p.goit.global/books/top-books");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("Error fetching initial books");
            return [];
        }
    } catch (error) {
        console.error("Error fetching initial books:", error);
        return [];
    }
}


function displayInitialBooks(booksWithListName) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; 

    booksWithListName.forEach((item) => {
        const listName = item.list_name;
        const books = item.books;

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("categoryNamesList");
        const categoryHeading = document.createElement("h3");
        categoryHeading.textContent = listName;

        categoryContainer.appendChild(categoryHeading);
        bookList.appendChild(categoryContainer);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("cardList");
        bookList.appendChild(cardContainer);
        // bookList.innerHTML = bookList.innerHTML + `<br/><br/>`;
        books.forEach((book) => {
            const bookCard = createBookCard(book);
            cardContainer.appendChild(bookCard);
        });

        
        console.log("booklist: ", bookList);
    });
}



// Function to fetch all books from the API (without list_name)
async function fetchAllBooks() {
    try {
        const response = await fetch("https://books-backend.p.goit.global/books/top-books");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Error fetching all books");
            return [];
        }
    } catch (error) {
        console.error("Error fetching all books:", error);
        return [];
    }
}

// Function to display books in the UI as cards
function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; 

    books.forEach((book) => {
        const bookCard = createBookCard(book);
        bookList.appendChild(bookCard);
    });
}

// Function to create a book card
function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const bookImage = document.createElement("img");
    bookImage.src = book.book_image;
    bookImage.alt = book.title; 
    bookImage.onload = () => {
        bookImage.style.opacity = 1; 
    };
    bookCard.appendChild(bookImage);

    const bookName = document.createElement("h3");
    bookName.textContent = book.title;
    bookCard.appendChild(bookName);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookCard.appendChild(bookAuthor);

    return bookCard;
}

// Function to fetch categories from the API
async function fetchCategories() {
    try {
        const response = await fetch("https://books-backend.p.goit.global/books/category-list");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Error fetching categories");
            return [];
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

// Function to display categories in the left panel
function displayCategories(categories) {
    const categoryList = document.getElementById("category-list");

    categories.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.textContent = category.list_name;
        listItem.addEventListener("click", () => {
            fetchBooksByCategory(category.list_name);
        });
        categoryList.appendChild(listItem);
    });
}

// Function to fetch books by category from the API
async function fetchBooksByCategory(categoryName) {
    try {
        const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${categoryName}`);
        if (response.ok) {
            const data = await response.json();
            displayBooks(data);
        } else {
            console.error("Error fetching books by category");
        }
    } catch (error) {
        console.error("Error fetching books by category:", error);
    }
}

// Dark mode toggle
const darkModeButton = document.getElementById("dark-mode");
const container = document.querySelector(".container");

darkModeButton.addEventListener("click", () => {
    container.classList.toggle("dark-mode");
    const darkModeEnabled = container.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
});

const savedDarkMode = localStorage.getItem("darkMode");

if (savedDarkMode === "true") {
    container.classList.add("dark-mode");
}


// Sign Up / Log In form
const signUpButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const authForm = document.getElementById("auth-form");

signUpButton.addEventListener("click", () => {
    authForm.classList.remove("hidden");
});

loginButton.addEventListener("click", () => {
    authForm.classList.remove("hidden");
});

// Submit form
const authFormSubmit = document.getElementById("auth-submit");

authFormSubmit.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    authForm.classList.add("hidden");
});

// Initial setup
document.addEventListener("DOMContentLoaded", async () => {
    const initialBooks = await fetchInitialBooks();
    displayInitialBooks(initialBooks);

    const allCategories = await fetchCategories();
    displayCategories(allCategories);
});
