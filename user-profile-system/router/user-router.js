const express = require('express');
const user_router = express.Router();
const { createUser, getUser, deleteUser } = require('../controller/user-logic');

user_router.post("/", createUser);
user_router.get("/", getUser);
user_router.delete("/:id", deleteUser);

module.exports =  user_router;

