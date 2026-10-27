

const { users, usersaddress } = require("../models/user-address-model")


const createUser = async (req, res) => {
    try {
        const user = new users(req.body)
        await user.save()
        res.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getUsers = async (req, res) => {
    try {
        const user = await users.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, email, age } = req.body;

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (age !== undefined) user.age = age;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        // await user.remove()
        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const createUserAddress = async (req, res) => {
    try {

        const {userId}=req.params
        // const adress = new usersaddress(req.body)
        // await address.save()
        
        const user = await users.findByIdAndUpdate(userId,{ $push: { address: req.body } },{ new: true, runValidators: true });
    
   
        res.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getUsersAddress = async (req, res) => {
    try {
        const {userId}=req.params
        const user = await users.findById(userId).select("name address");
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({message:"User address fetched successfully",data:user})
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const updateUserAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        const user = await users.findOneAndUpdate(
            {
                _id: userId,
                "address._id": addressId
            },
            {
                $set: {
                    "address.$.street": req.body.street,
                    "address.$.city": req.body.city,
                    "address.$.state": req.body.state,
                    "address.$.pincode": req.body.pincode,
                    "address.$.country": req.body.country
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User or address not found"
            });
        }

        res.status(200).json({
            message: "Address updated successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const deleteUserAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        const user = await users.findOneAndUpdate(
            {
                _id: userId,
                "address._id": addressId
            },
            {
                $pull: {
                    address: { _id: addressId }
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User or address not found"
            });
        }

        res.status(200).json({
            message: "Address deleted successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    createUserAddress,
    getUsersAddress,
    updateUserAddress,
    deleteUserAddress
}