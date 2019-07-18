const express = require('express')
const router = express();

//Models
const User = require('../../models/User')
//Middleware 
const isProtected = require("../../middleware/check-token");



/**
 * @routes GET api/auth
 * @desc Test Routes
 * @access Private
 */
router.get('/', isProtected, async(req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password ');

        return res.json(user);
        
    } catch (error) {
        console.log('err-auth:', error.message)

        return res.status(500).send("server error")

    }
    
})




module.exports = router