const express = require('express');
const router = express.Router();

const Ticket = require('../model/ticket');

// Create ticket
router.post('/', async (req, res) => {
  try {
    const ticketData = req.body;

    if (!ticketData) {
      return res.status(400).json({ message: 'Input all fields' });
    }

    // Check if the ticket already exists based on certain criteria
    const existingTicket = await Ticket.findOne({userId: ticketData.userId, eventId: ticketData.eventId});

    if (existingTicket) {
      return res.status(409).json({ message: 'Ticket Already Exists.' });
    }

    // Create the ticket
    const ticket = await Ticket.create(ticketData);

    // Populate the user_id and event_id fields
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('userId', 'firstName email') 
      .populate('eventId', 'title description') 

    // Respond with the populated ticket
    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the ticket', error: error.message });
  }
});


 

// Get All ticket
router.get('/all', async (req, res) => {
    try {

      const populatedTicket = await Ticket.find().select('-uuid')
      .populate('userId', 'firstName email') 
      .populate('eventId', 'title description') 

      if(!populatedTicket){
       return res.json('No current tickets at the moment');
      }
     

      res.status(200).json(populatedTicket);
    } catch (error) {
      res.status(500).json('Error fetching tickets');
    }
  });
  


// Get ticket by Id
router.get('/:Id', async (req, res) => {
    try {

      const populatedTicket = await Ticket.findById(req.params.Id).select('-uuid')
      .populate('userId', 'firstName email') 
      .populate('eventId', 'title description') 

      if (!populatedTicket) {
        return res.status(404).json('Ticket not found');
      }
      
      res.json(populatedTicket);
    } catch (error) {
      res.status(500).json('Error fetching the ticket');
    }
  });
  


// Update ticket by id
router.put('/:Id', async (req, res) => {
    try {
      const updatedTicketData = req.body;

      const ticket = await Ticket.findByIdAndUpdate(req.params.Id, updatedTicketData, { new: true })
      .populate('userId', 'firstName email') 
      .populate('eventId', 'title description');
      
      if (!ticket) {
        return res.status(404).json('Ticket not found');
      }
      
      res.json(ticket);
    } catch (error) {
      res.status(500).json('Error updating the ticket');
    }
  });
  

// Delete ticket by id
router.delete('/:Id', async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndRemove(req.params.Id);
      
      if (!ticket) {
        return res.status(404).json('Ticket not found');
      }
      
      res.json('Ticket deleted successfully');

    } catch (error) {
      res.status(500).json('Error deleting the ticket');
    }
});


module.exports = router;