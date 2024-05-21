const User = require("../models/userModal");
const mongoose = require('mongoose');

const createUser = async (req, res) => {
    try {
        const { name, projectId, email } = req.body;

        const newUser = new User({
            projectId,
            name,
            email
        });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const update = await User.findByIdAndUpdate(id, { name, email });
        res.json(update);
        if (!update) {
            return res.status(404).json({ message: 'User not found' });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const deleteUser = await User.findByIdAndDelete(id);


        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserByProject =  async (req, res) => {
    try {
        const { projectId } = req.query;


        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        const matchstage = {};

        const aggregationPipeline = [
            {
                $match: {
                    projectId: String(projectId),
                    ...matchstage
                },
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectId",
                    foreignField: "_id",
                    as: "projectDetails",
                },
            },
            {
                $unwind: {
                    path: "$projectDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const Users = await User.aggregate(aggregationPipeline);
        res.status(200).json({ Users });


    } catch (error) {
        console.error("Error (getUsers):", error);
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    createUser, updateUser, deleteUser, getUser,getUserByProject
}