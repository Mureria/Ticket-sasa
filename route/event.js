const express = require('express');
const router = express.Router();

const Event = require('../model/events');

// Create Event
router.post('/', async (req, res) => {

    try {
      const eventData = req.body; // Event data from the request body
      
      
      if(!(title && eventId && organizerId && description && location && date && ticketPrice && totalTickets )) {
        res.status(400).send('All input is required');
    };

      const event = await Event.create(eventData);

      res.status(201).json(event); // Respond with the created event

    } catch (error) {
      res.status(500).json('Error creating the event' );
    }
  });



  module.exports =  router;
  