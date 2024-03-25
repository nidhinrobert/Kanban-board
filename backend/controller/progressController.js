const Progress = require("../models/progessModal")
const mongoose = require('mongoose');


const getAllProgress = async (req, res) => {
    try {
      
        const allProgress = await Progress.find();

        res.json(allProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProgress = async (req, res) => {
    try {

        const { title, description, status,dueDate } = req.body;

        const newProgress = new Progress({ title, description, status,dueDate });
        await newProgress.save();

        res.status(201).json(newProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status,dueDate } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const updatedProgress = await Progress.findByIdAndUpdate(id, { title, description, status,dueDate }, { new: true });
        if (!updatedProgress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.json(updatedProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteProgress = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const deletedProgress = await Progress.findByIdAndDelete(id);


        if (!deletedProgress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        res.json({ message: 'Progress deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getProgress = async (req, res) => {
    try {
        const { id } = req.params; 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const progress = await Progress.findById(id);

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getTodo = async(req,res) => {
    try{
        const todo = await Progress.find({status:'todo'});
        res.json(todo);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getInProgress = async(req,res) => {
    try{
        const InProgress = await Progress.find({status:'in-progress'});
        res.json(InProgress);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getDone = async(req,res) => {
    try{
        const done = await Progress.find({status:'done'});
        res.json(done);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { newStatus } = req.body;
  
      
      const updatedTask = await Progress.findByIdAndUpdate(id, { status: newStatus }, { new: true });
  
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };





module.exports = { createProgress, updateProgress ,deleteProgress,getAllProgress,getProgress,getTodo,getDone,getInProgress,updateTaskStatus};