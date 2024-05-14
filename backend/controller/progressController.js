const Progress = require("../models/progessModal");
const mongoose = require('mongoose');



const createProgress = async (req, res) => {
    try {
        const { title, description, status, dueDate, projectId } = req.body;

        const newProgress = new Progress({
            title,
            description,
            projectId,
            status,
            dueDate,
        });
        await newProgress.save();

        res.status(201).json(newProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const updatedProgress = await Progress.findByIdAndUpdate(
            id,
            { title, description, status, dueDate },
            { new: true }
        );
        if (!updatedProgress) {
            return res.status(404).json({ message: "Progress not found" });
        }
        res.json(updatedProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteProgress = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const deletedProgress = await Progress.findByIdAndDelete(id);

        if (!deletedProgress) {
            return res.status(404).json({ message: "Progress not found" });
        }

        res.json({ message: "Progress deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
const getProgress = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const progress = await Progress.findById(id);

        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }

        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;

        const updatedTask = await Progress.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



const gettodoByProject = async (req, res) => {
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
                    status: "todo",
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

        const taskItems = await Progress.aggregate(aggregationPipeline);
        res.status(200).json({ taskItems });


    } catch (error) {
        console.error("Error (getProgress):", error);
        res.status(500).json({ error: error.message });
    }
};

const getInProgressByProject = async (req, res) => {
    try {
        const { projectId } = req.query
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "Invalid project ID" });

        }
        const matchstage = {};

        const aggregationPipeline = [
            {
                $match: {
                    projectId: String(projectId),
                    status: "in-progress",
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

        const taskItems = await Progress.aggregate(aggregationPipeline);
        res.status(200).json({ taskItems });


    } catch (error) {
        console.error("Error (getProgress):", error);
        res.status(500).json({ error: error.message });
    }
}

const getDoneByProject = async (req, res) => {
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
                    status: "done",
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

        const taskItems = await Progress.aggregate(aggregationPipeline);
        res.status(200).json({ taskItems });


    } catch (error) {
        console.error("Error (getProgress):", error);
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    createProgress,
    updateProgress,
    deleteProgress,
    getProgress,
    getDoneByProject,
    getInProgressByProject,
    updateTaskStatus,
    gettodoByProject
};
