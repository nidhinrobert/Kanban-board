const Project = require ('../models/projectModel')
const mongoose = require('mongoose');

const getAllProjects = async (req, res) => {
    try {
      
        const allProjects = await Project.find();

        res.json(allProjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const createProject= async (req,res) => {
    try{
        const {heading,description}= req.body;
        const newProject = new Project({heading,description})
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
        const { heading, description } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const update = await Project.findByIdAndUpdate(id, { heading, description });
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
