const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    heading:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require : true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})
projectSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});
const projectDb = mongoose.model('project',projectSchema);
module.exports=projectDb