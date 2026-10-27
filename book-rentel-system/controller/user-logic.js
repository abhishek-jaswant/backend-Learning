const user = require('../model/user-model');
const book = require('../model/books-model');

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        const data = new user({ name, email });
        await data.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const getUser = async (req, res) => {
    try {
        const data = await user.find();
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User fetched successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user' });
    }
};


const rentBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        if (!bookId) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }

        const bookdata = await book.findById(bookId);
        if (!bookdata) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const data = await user.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
      const updated = await user.findByIdAndUpdate(
    req.params.id,
    { $push: { rentedBooks: bookId } },
    { new: true }
);
        await book.findByIdAndUpdate(bookId, { $push: { rentedBy: req.params.id } });
        res.status(200).json({
            message: 'Book rented successfully',
            data: updated,
         
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const returnBook = async (req, res) => {
    try {

        const { bookId } = req.body;
        if (!bookId)
        {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }

        const data = await book.findById(bookId);

        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }

    const bookpresent = await user.findOne({
    _id: req.params.id,
    rentedBooks: bookId
    });
        
        if (!bookpresent) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const returnBook = await user.findByIdAndUpdate(req.params.id, { $pull: { rentedBooks: bookId } },{ new: true });

        await book.findByIdAndUpdate(bookId, { $pull: { rentedBy: req.params.id } });
        res.status(200).json({
            message: 'Book returned successfully',
            data: returnBook,
        });
       
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const allbooksofusers = async (req, res) => {
    try {
        const data = await user.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        const booksofuser = await user.findById(req.params.id).populate("rentedBooks","title");
        res.status(200).json({
            message: 'Books of user fetched successfully',
            data: booksofuser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createUser, getUser, rentBook, returnBook,allbooksofusers };