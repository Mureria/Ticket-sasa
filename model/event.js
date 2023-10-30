const mongoose = require('mongoose');

const eventSchhema = new mongoose.Schema({

title: {
    type:String,
    require:true
},

eventId: {
    type:Number,
    unique:true
}, 

organizerId: {
    type:Number
},

description:{
    type:String,
    required:true
}, 

date: {
    type:Number,
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
}

});


module.exports= mongoose.model('events', eventSchhema);