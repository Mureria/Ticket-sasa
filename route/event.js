const express = require('express');
const router = express.Router();


const Event = require('../model/event');
const restrict = require('../middleware/restrict');


// Create Event
router.post('/', async (req, res) => {

    try {

        const {title, description, date, location, ticketPrice, totalTickets   } = req.body;

        if(!(title && description && location && date && ticketPrice && totalTickets)) {
           return  res.status(400).json('Enter all inputs')
        }
        const event = await Event.create({title, description, date, location, ticketPrice, totalTickets   });

        res.status(201).json(event);

    } catch (error) {
      res.status(500).json({ message: 'Error creating the event', error: error.message });
    }
});


//   Get All Events
router.get('/all', async (req, res) => {

    try {

      const events =  await Event.find();

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
router.put('/:Id', async (req, res) => {
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
router.delete('/:Id', restrict('admin', 'organizer'), async (req, res) => {
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
  