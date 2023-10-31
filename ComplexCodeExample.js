// Code Filename: ComplexCodeExample.js

// This code is a complex implementation of a virtual bookstore.
// It includes features such as user authentication, book search,
// adding books to a cart, and placing an order.

// Global variables
let users = [];
let books = [];
let cart = [];
let orders = [];

// User object constructor
function User(id, name, email, password) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.cart = [];
  this.orders = [];
}

// Book object constructor
function Book(id, title, author, price, stock) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.price = price;
  this.stock = stock;
}

// Dummy data initialization
users.push(new User(1, "John Doe", "john@example.com", "pass123"));
users.push(new User(2, "Jane Smith", "jane@example.com", "pass456"));

books.push(new Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 10.99, 5));
books.push(new Book(2, "To Kill a Mockingbird", "Harper Lee", 8.99, 3));

// Function to authenticate a user
function authenticateUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  return user ? user : null;
}

// Function to search for books by title or author
function searchBooks(query) {
  const results = books.filter(book => book.title.includes(query) || book.author.includes(query));
  return results.length > 0 ? results : null;
}

// Function to add a book to the user's cart
function addToCart(userId, bookId) {
  const user = users.find(user => user.id === userId);
  const book = books.find(book => book.id === bookId);

  if (user && book && book.stock > 0) {
    user.cart.push(book);
    book.stock--;
    return true;
  }
  
  return false;
}

// Function to place an order
function placeOrder(userId) {
  const user = users.find(user => user.id === userId);

  if (user && user.cart.length > 0) {
    const order = user.cart.slice();
    user.orders.push(order);
    cart = cart.filter(book => !order.includes(book));
    orders.push(order);
    return order;
  }

  return null;
}

// Usage example
const loggedInUser = authenticateUser("john@example.com", "pass123");
if (loggedInUser) {
  console.log(`Welcome, ${loggedInUser.name}!`);

  const searchResults = searchBooks("Mockingbird");
  if (searchResults) {
    console.log("Search results:");
    searchResults.forEach(book => console.log(book.title));
  
    const addedToCart = addToCart(loggedInUser.id, searchResults[0].id);
    if (addedToCart) {
      console.log("Book added to cart!");
      console.log("Current cart:", loggedInUser.cart);
  
      const order = placeOrder(loggedInUser.id);
      if (order) {
        console.log("Order placed successfully!");
        console.log("Your orders:", loggedInUser.orders);
        console.log("All orders:", orders);
      } else {
        console.log("Failed to place order.");
      }
    } else {
      console.log("Failed to add book to cart.");
    }
  } else {
    console.log("No books found.");
  }
} else {
  console.log("Invalid credentials.");
}

// More functions and logic can be added below...

// ...

// ...