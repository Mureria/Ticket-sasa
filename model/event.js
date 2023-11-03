const mongoose = require('mongoose');
const uuid = require('uuid');


const eventSchhema = new mongoose.Schema({
uuid: {
        type: String,
        default: uuid.v4(), // Generate a new UUID for each event
        unique: true,
},

title: {
    type:String,
    require:true
}, 

description:{
    type:String,
    required:true
}, 

date: {
    type:Date,
    required:true
},

location: {
    type:String,
    required:true
},
ticketPrice: {
    type:Number,
    required:true
},

totalTickets: {
    type:Number
    
}},  {timestamps:true});


module.exports= mongoose.model('Event', eventSchhema);