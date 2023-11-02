const express = require('express')
const router = express.Router()

const User = require('../model/user');
const verifyToken = require('../middleware/verifyToken');




// Get All Users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
});



//Get User by id
router.get('/:Id', async (req, res) => {
  const userId = req.params.Id;

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json('User not found');
    }
    
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json('An error occurred while fetching the user' );
  }
});


// Update User by Id
router.put('/:Id', async (req, res) => {

  const userId = req.params.Id;

  const updatedUserData = req.body; // Data to update

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!user) {
      return res.status(404).json('User not found');
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json('An error occurred while updating the user');
  }
});



// Delete user by id
router.delete('/:Id',  async (req, res) => {
  
  const userId = req.params.Id;

  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json('User not found');
    }

    res.json('User deleted successfully');

  } catch (error) {
    res.status(500).json('An error occurred while deleting the user');
  }
});


module.exports = router
