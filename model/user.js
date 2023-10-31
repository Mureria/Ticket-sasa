const mongoose = require('mongoose');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid.v4(), // Generate a new UUID for each user
        unique: true,
      },

    firstName: {
        type:String,
        required: true
    },
 
    secondName: {
        type:String,
        required:true
    },

    email: {
        type:String,
        unique:true
    },

    password: {
        type:String,
        required:true
    },
    token: {
        type:String
    }
},  {timestamps:true});

module.exports = mongoose.model('User', userSchema);