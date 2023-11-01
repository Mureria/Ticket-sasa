const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user')



// Register
router.post('/register', async(req, res) => {

    try {

    // Get user input
    const {firstName, secondName, email, password, role  } = req.body;

    // Validate user input

    if(!(email && password && firstName && secondName && role)) {
        res.status(400).send('All input is required');
    };

    // Check and validate if user exist in our db

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return res.status(409).send('User Already Exist. Please Login')
    };

    // Encrypt users password (auto-gen a salt and hash):
    encryptedPassword = bcrypt.hash(password, 10) ;


    // Create user in the db

    const user = await User.create({
        firstName,
        secondName,
        email,
        password: await  encryptedPassword
    });

    // Create token
    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_SECRET,
        {expiresIn: "2h"}
        );

        // save user token
        user.token = token;
        

        // return the created new user
        res.status(201).json(user);



    } catch (error) {
        console.log(error);

    }
});





router.post("/login", async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {

        res.status(400).send("All input is required");
      };


      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }

      res.status(400).send("Invalid Credentials");

    } catch (err) {
      console.log(err);
    }
  });



module.exports = router;