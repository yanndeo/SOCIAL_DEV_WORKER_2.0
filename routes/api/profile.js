const express = require('express')
const router = express();



/**
 * @routes GET api/profile
 * @desc Test Profile
 * @access Public
  */
router.get('/', (req, res) => {

    res.send('Profile router')
})




module.exports = router