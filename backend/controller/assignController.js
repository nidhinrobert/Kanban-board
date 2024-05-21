const Assign = require("../models/assignModal");
const mongoose = require('mongoose');


const createAssign = async (req, res) => {
    try {
        const { assignName, taskId } = req.body;

        const newAssign = new Assign({
            assignName,
            taskId
        });
        await newAssign.save();

        res.status(201).json(newAssign);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
const deleteAssign = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const deleteAssign = await Assign.findByIdAndDelete(id);


        if (!deleteAssign) {
            return res.status(404).json({ message: 'Assign not found' });
        }

        res.json({ message: 'Assign deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


const getUserByAssign =  async (req, res) => {
    try {
        const { taskId } = req.query;


        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const matchstage = {};

        const aggregationPipeline = [
            {
                $match: {
                    taskId: String(taskId),
                    ...matchstage
                },
            },
            {
                $lookup: {
                    from: "progresses",
                    localField: "taskId",
                    foreignField: "_id",
                    as: "taskDetails",
                },
            },
            {
                $unwind: {
                    path: "$taskDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const Assigns = await Assign.aggregate(aggregationPipeline);
        res.status(200).json({ Assigns });


    } catch (error) {
        console.error("Error (getAssign):", error);
        res.status(500).json({ error: error.message });
    }
};



module.exports ={createAssign,deleteAssign,getUserByAssign}