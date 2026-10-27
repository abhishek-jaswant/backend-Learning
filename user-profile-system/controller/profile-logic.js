
const profile = require('../model/profile-Schema');
const user = require('../model/user-Schema');

const createProfile = async (req, res) => {
     
    try {
      
        const { bio, socialMediaLinks, userId } = req.body;
        if (!bio  || !userId|| !socialMediaLinks) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        console.log(bio, socialMediaLinks, userId);
        const data = new profile({ bio, socialMediaLinks, userId });
        await data.save();
        res.status(201).json({ message: 'Profile created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile' });
    }
};

const getProfile = async (req, res) => {
    try {
     
        
        const data = await profile.find().populate('userId',"name");
        if (!data) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile fetched successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { bio, socialMediaLinks } = req.body;
        if (!bio|| !socialMediaLinks) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }
        const data = await profile.findByIdAndUpdate(req.params.id, {
            $set: {
                bio :bio,
                socialMediaLinks :socialMediaLinks,
            }
        });
        if (!data) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const data = await profile.findById(req.params.id);
        
        if (!data&&!data.userId) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        await profile.findByIdAndDelete(req.params.id);
        await user.findByIdAndDelete(data.userId);
        

        
        res.status(200).json({
            message: 'Profile deleted successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile' });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
};