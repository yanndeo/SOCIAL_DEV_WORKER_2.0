const express = require('express')
const router = express();



/**
 * @routes GET api/auth
 * @desc Test Routes
 * @access Public
  */
router.get('/', (req, res) => {

    res.send('Auth router')
})




module.exports = router