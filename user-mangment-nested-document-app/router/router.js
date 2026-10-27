const express = require("express")
const router = express.Router()

const {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    createUserAddress,
    getUsersAddress,
    updateUserAddress,
    deleteUserAddress
} = require("../controller/busnisessLogic");

router.post("/", createUser)
router.get("/", getUsers)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/adress/:userId", createUserAddress)
router.get("/adress/:userId", getUsersAddress)
router.patch("/adress/:userId/:addressId", updateUserAddress)
router.delete("/adress/:userId/:addressId", deleteUserAddress)

module.exports = router





