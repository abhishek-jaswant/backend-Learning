const express = require("express")
const Notesrouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require("../model/user-model")
const notesModel = require("../model/notes-model")
const authMiddleware = require("../middleware/auth-middleware")
const saltRounds = 10;

Notesrouter.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, content, createdBy } = req.body;
        const user = await userModel.findById(createdBy)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const newNote = await notesModel.create({
            title,
            content,
            createdBy
        })
        return res.status(201).json({
            message: "Note created successfully",
            newNote
        })
    } catch (error) {
        console.log("error is--->",error.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})  

Notesrouter.get("/:id", authMiddleware, async (req, res) => {
    try {
        const note = await notesModel.find({ createdBy: req.userId }).select("title content ")
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        return res.status(200).json({
            message: "Note fetched successfully",
            note
        })
    } catch (error) {
        console.log("error is--->",error.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})
    
Notesrouter.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await notesModel.findById({_id: req.params.id})
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        const updatedNote = await notesModel.findByIdAndUpdate(req.params.id, {
            title,
            content
        }, { new: true, runValidators: true })
        return res.status(200).json({
            message: "Note updated successfully",
            updatedNote
        })
    } catch (error) {

        console.log("error is--->",error.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})

Notesrouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const note = await notesModel.findById({ _id: req.params.id })
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        const deletedNote = await notesModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        })
    } catch (error) {
        console.log("error is--->",error.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})


module.exports = Notesrouter