
const express = require('express')
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')


//Models
const User = require('../../models/User')

//Middleware 
const isProtected = require('../../middleware/check-token')

//Validation
const { validationResult } = require('express-validator');
const checkedRequest = require('../../validations/UserValidation');






/**
 * @routes POST api/users
 * @desc   Register user
 * @access Public
 */
router.post('/', checkedRequest.onRegister, async(req, res) => {

        //Validation
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }


        const {name, email, password} = req.body;

        try {

            //Check if user exist
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ errors : [{ msg: 'User already exist'}]})
            }

            //Get users gravatar
            const avatar = gravatar.url(email, { s: '200',r: 'pg', d: 'mm' }) ;

            user = new User({ name, email, avatar, password });

            //Encrypt password :encrypted in model User hook pre.save()

            await user.save();

            //Return jsonwebtoken : static method in model to generate token

            const token = await User.generateWebToken(user.id);

            return res.json({token});



        } catch (err) {
            console.log('register-err', err.message)
            return res.status(500).json('Server Error')

        }
   


})




module.exports = router