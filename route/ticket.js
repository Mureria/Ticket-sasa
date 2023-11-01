const express = require('express');
const router = express.Router();

const Ticket = require('../model/ticket');




// Create ticket
router.post('/', async (req, res) => {
  try {
    const ticketData = req.body;

    if (!ticketData) {
      return res.status(400).json('Input all fields');
    }

    // Check if the ticket already exists based on certain criteria
    const existingTicket = await Ticket.findOne({
      eventId: ticketData.eventId,
      userId: ticketData.userId,
    });


    if (existingTicket) {
      return res.status(409).json('Ticket Already Exists.');
    }

    // Create the ticket with the user_id and event_id populated
    const ticket = await Ticket.create(ticketData);



    // Populate the user_id and event_id fields
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('userId', 'secondName email') // Populate user data with username and email fields
      .populate('eventId', 'title description'); // Populate event data with title and description fields

    // Respond with the populated ticket
    res.status(201).json(populatedTicket);
    console.log(populatedTicket);

  } catch (error) {
    res.status(500).json({ message: 'Error creating the event', error: error.message });
  }
});

  

// Get All ticket
router.get('/all', async (req, res) => {
    try {

      const tickets = await Ticket.find();

      if(!tickets){
       return res.json('No current tickets at the moment');
      }

      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json('Error fetching tickets');
    }
  });
  


// Get ticket by Id
router.get('/:Id', async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.Id);
      
      if (!ticket) {
        return res.status(404).json('Ticket not found');
      }
      
      res.json(ticket);
    } catch (error) {
      res.status(500).json('Error fetching the ticket');
    }
  });
  


// Update ticket by id
router.put('/:Id', async (req, res) => {
    try {
      const updatedTicketData = req.body;

      const ticket = await Ticket.findByIdAndUpdate(req.params.Id, updatedTicketData, { new: true });
      
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