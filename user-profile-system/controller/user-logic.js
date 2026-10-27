
const user = require('../model/user-Schema');
const profile = require('../model/profile-Schema');
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        console.log(name, email);
        const data = new user({ name, email});
        await data.save();
        res.status(201).json({ message: 'User created successfully'});
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

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name|| !email) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        const data = await user.findByIdAndUpdate(req.params.id, {
            $set: {
                name :name,
                email :email,
            }
        });
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {

        console.log("User ID:", req.params.id);
        const data = await user.findById(req.params.id);
        console.log(data);
        
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(data._id);
        await user.findByIdAndDelete(req.params.id);
        await profile.findOneAndDelete({userId:data._id});
        

        
        res.status(200).json({
            message: 'User deleted successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};



module.exports = {
    createUser,
    getUser,
    deleteUser,
};