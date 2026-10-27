const express = require('express');
const profile_router = express.Router();

const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controller/profile-logic');

profile_router.post("/", createProfile);
profile_router.get("/", getProfile);
profile_router.patch("/:id", updateProfile);
profile_router.delete("/:id", deleteProfile);

module.exports =  profile_router;