const mongoose = require('mongoose')

const assignSchema = new mongoose.Schema({
    assignName:{
        type:String,
        required: true
    },
    taskId: {
        type: String,
        require: true
    }
    

});
const assignDb = mongoose.model('assign',assignSchema);
module.exports=assignDb