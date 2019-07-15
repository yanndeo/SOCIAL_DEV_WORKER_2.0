const express =require('express')
const router = express();



/**
 * @routes GET api/posts
 * @desc Test Routes
 * @access Public
  */
router.get('/',(req, res )=>{

    res.send('Posts router')
})




module.exports =router