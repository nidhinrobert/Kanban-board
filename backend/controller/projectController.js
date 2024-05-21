const Project = require ('../models/projectModel')
const mongoose = require('mongoose');

const getAllProjects = async (req, res) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
    const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : 10;

    try {
        const matchStage = {};

        const aggregationPipeline = [
            { $match: matchStage },
            // { $sort: { createdAt: -1 } },
            {
                $facet: {
                    Projects: [
                        { $project: { _id: 1, heading: 1, description: 1, createdAt: 1, dueDate: 1 } },
                        { $skip: Math.max(0, (currentPage - 1) * itemsPerPage) },
                        { $limit: itemsPerPage },
                    ],
                    totalCount: [
                        { $count: 'count' }
                    ],
                }
            },
            {
                $project: {
                    Projects: 1,
                    totalCount: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
                }
            }
        ];

        const result = await Project.aggregate(aggregationPipeline);
        const { Projects, totalCount } = result[0];
        res.status(200).json({ Projects, totalCount });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProject= async (req,res) => {
    try{
        const {heading,description,dueDate}= req.body;
        const newProject = new Project({heading,description,dueDate})
        await newProject.save();
        res.status(201).json(newProject);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, description,dueDate } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const update = await Project.findByIdAndUpdate(id, { heading, description,dueDate });
        res.json(update);
        if (!update) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const deleteProject = await Project.findByIdAndDelete(id);


        if (!deleteProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
    const getProject = async (req, res) => {
        try {
            const { id } = req.params; 
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID' });
            }
    
            const project = await Project.findById(id);
    
            if (!project) {
                return res.status(404).json({ message: 'project not found' });
            }
    
            res.json(project);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    };






module.exports = {createProject,updateProject,deleteProject,getAllProjects,getProject};
