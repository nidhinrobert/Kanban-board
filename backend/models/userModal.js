const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    projectId: {
        type: String,
        require: true
    }
    

});
const userDb = mongoose.model('user',userSchema);
module.exports=userDb