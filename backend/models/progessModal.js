const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: { 
        type: String,
         enum: ['todo', 'in-progress', 'done'],
          default: 'todo' 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    dueDate: {
        type: Date
    }
    
})
progressSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

const progressDb = mongoose.model('progress', progressSchema);
module.exports = progressDb