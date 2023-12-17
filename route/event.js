const express = require('express');
const router = express.Router();


 
const Event = require('../model/event');
const { adminMiddleware } = require('../middleware/role');
const verifyToken = require('../middleware/verifyToken');


// Create Event
router.post('/', async (req, res) => {

    try {
         const {title, description, date, location, ticketPrice, totalTickets   } = req.body;

        if(!(title && description && location && date && ticketPrice && totalTickets)) {
           return  res.status(400).json('Enter all inputs')
        }


        const existingEvent = await Event.findOne({title, description, date, location, ticketPrice, totalTickets});

        if (existingEvent) {
          return res.status(409).json({ message: 'Ticket Already Exists.' });
        }

        const event = await Event.create({title, description, date, location, ticketPrice, totalTickets   });
        

        res.status(201).json(event);

    } catch (error) {
      res.status(500).json({ message: 'Error creating the event', error: error.message });
    }
});


//   Get All Events
router.get('/', async (req, res) => {

    try {

      const events =  await Event.find();

      if (!events || events.length === 0) {
        return res.status(404).json('No Event Found');
      }

      res.json(events);

    } catch (error) {

      res.status(500).json('Error fetching events');
    }
});



// Get Event by Id
router.get('/:Id', async (req, res) => {

    try {

      const event = await Event.findById(req.params.Id);
      
      if (!event) {
        return res.status(404).json('Event not found');
      }
      
      res.json(event);

    } catch (error) {
      res.status(500).json('Error fetching the event');
    }
});


// Update an Event
router.put('/:Id', verifyToken, async (req, res) => {
    try {

      const updatedEventData = req.body; // Updated event data from the request body

      const event = await Event.findByIdAndUpdate(req.params.Id, updatedEventData, { new: true });
      
      if (!event) {
        return res.status(404).json('Event not found');
      }
      
      res.json(event);

    } catch (error) {
      res.status(500).json('Error updating the event');
    }
});


//   Delete Event by Id
router.delete('/:Id', async (req, res) => {
    try {
      const event = await Event.findByIdAndRemove(req.params.Id);
      
      if (!event) {
        return res.status(404).json('Event not found');
      }
      
      res.json('Event deleted successfully');
    } catch (error) {
      res.status(500).json('Error deleting the event');
    }
});
  


module.exports =  router;
  