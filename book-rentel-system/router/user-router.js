const express = require('express');
const user_router = express.Router();
const { createUser, getUser, rentBook,returnBook,allbooksofusers } = require('../controller/user-logic');

user_router.post("/", createUser);
user_router.get("/", getUser);
user_router.patch("/rent/:id", rentBook);
user_router.patch("/return/:id", returnBook);
user_router.get("/allbooksofuser/:id", allbooksofusers);

module.exports = user_router;