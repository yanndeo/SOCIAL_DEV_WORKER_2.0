const express = require('express')
const router = express();
const bcrypt = require("bcryptjs");


//Models
const User = require('../../models/User')
//Middleware 
const isProtected = require("../../middleware/check-token");
//Validation
const { validationResult } = require('express-validator');
const checkedRequest = require('../../validations/UserValidation');







/**
 * @routes GET api/auth
 * @desc Recupere l'user connected
 * @desc via le token dans le header
 * @access Private
 */
router.get('/', isProtected, async(req, res) => {

    try {

        //Recuperl'user sans le pwd
        const user = await User.findById(req.user.id).select('-password ');

        return res.json(user);
        
    } catch (error) {

        console.log('err-auth:', error.message)
        
        return res.status(500).send("server error")

    }
    
});









/**
 * @routes GET api/auth/login
 * @desc Test Routes
 * @access Public
 */
router.post('/', checkedRequest.onLogin , async(req, res)=>{

    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body; 

    try {
        //Find user by email
        const user = await User.findOne({ email });

        //Check if user exist in database
        if(!user){

            return res.status(400).json({ errors: [{ msg: 'User not found' }] })

        }else{

            //If user exist verify his password with 
            const isMatched = await User.comparePasswd(password, user.password) ;

            if(!isMatched){

                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            
            // if it's ok sen him a token
            const token = await User.generateWebToken(user.id);

            return res.json({ token })


        }

    } catch (error) {
        console.log('err-auth-login:', error.message)

        return res.status(500).json(" Server error")
    }

})




module.exports = router