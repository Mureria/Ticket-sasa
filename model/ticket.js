const mongoose = require('mongoose');
const uuid = require('uuid');



const ticketSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid.v4(), // Generate a new UUID for each event
        unique: true,
      },

    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Events' 
    },
    
    userId:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
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

module.exports = mongoose.model('Ticket', ticketSchema);
 