const mongoose = require('mongoose');
const uuid = require('uuid');

const Event = require('../model/event');
const User = require('../model/user');


const ticketSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid.v4(), // Generate a new UUID for each event
        unique: true,
      },

    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: Event, 
        required: true
    },
    
    userId:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: User,
        required: true
    },
    
    status: {
        type:String,  
        required:true
        // cancelled,used,purchased
    },

   
}, {timestamps:true});

// Changing '_id' key to 'id', more frontend friendly
ticketSchema.virtual('id').get( function(){
    return this._id.toHexString();
});

ticketSchema.set('toJSON', {
    virtuals:true
});

module.exports = mongoose.model('Ticket', ticketSchema);
 