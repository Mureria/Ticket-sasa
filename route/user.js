const express = require('express')
const router = express.Router()

const User = require('../model/user');
const verifyToken = require('../middleware/verifyToken');
const { adminMiddleware, organizerMiddleware } = require('../middleware/role');




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
router.put('/:Id', verifyToken, async (req, res) => {

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
router.delete('/:Id', verifyToken, async (req, res) => {
  
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

router.delete("/:Id", verifyToken, adminMiddleware, organizerMiddleware, async (req, res) => {
  try {
    // First find the user admin wants to delete
    const user = await User.findById(req.params.Id) // getting id from the id you put in url

    if(!user){
      return res.send('No user found');
    }

    await user.deleteOne() 

    res.status(403).json("User deleted successfully!")
  } catch (error) {
    res.sendStatus(500);
  }
});


module.exports = router
