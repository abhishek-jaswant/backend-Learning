
const book = require('../model/books-model');
const user = require('../model/user-model');

const createBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        if (!title || !author || !genre) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        const data = new book({ title, author, genre });
        await data.save();
        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating book' });
    }
};

const getBook = async (req, res) => {
    try {
        const data = await book.find();
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            message: 'Book fetched successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting book' });
    }
};

const allusersofbook = async (req, res) => {
    try {
        const data = await book.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const usersofbook = await book.findById(req.params.id).populate("rentedBy","name");
        res.status(200).json({
            message: 'Users of book fetched successfully',
            data: usersofbook,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        if (!title || !author || !genre) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        const data = await book.findByIdAndUpdate(req.params.id, {
            $set: {
                title,
                author,
                genre,
            },
        });
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            message: 'Book updated successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
};


const deleteBook = async (req, res) => {
    try {
        const data = await book.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await user.updateMany({ rentedBooks: req.params.id }, { $pull: { rentedBooks: req.params.id } });
        await book.findByIdAndDelete(req.params.id);
      
        res.status(200).json({
            message: 'Book deleted successfully',
            data,
        });
    } catch (error)
    {
        res.status(500).json({ message: 'Error deleting book' });
    }
};
       


module.exports = { createBook, getBook,allusersofbook,updateBook,deleteBook };