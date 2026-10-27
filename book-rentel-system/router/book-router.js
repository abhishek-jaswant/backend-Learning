const express = require('express');
const book_router = express.Router();

const { createBook, getBook,allusersofbook} = require('../controller/books-logic');

book_router.post("/", createBook);  
book_router.get("/", getBook);
book_router.get("/allusersofbook/:id", allusersofbook);
book_router.patch("/update/:id", updateBook);
book_router.delete("/delete/:id", deleteBook);



module.exports = book_router;