const mongoose = require('mongoose');
const event =require('../model/event');
const user =require('../model/user');

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type:Number,
        Unique:true
     },

    eventId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'event'
    },

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    purchaseDate: {
        type:Date,
        required:true
    },
    status: {
        type:String,  
        required:true
        // cancelled,used,purchased
    }
   
}, {timestamps:true});

module.exports = mongoose.model('ticket', ticketSchema);
 