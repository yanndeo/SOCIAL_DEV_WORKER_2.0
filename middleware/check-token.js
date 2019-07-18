const jwt  = require('jsonwebtoken');
const config = require('config');



/**
 * un middleware est avant tout juste en function
 */


 const protectedRoute =  async(req, res, next)=>{

    //Get TOKEN from headers request
    const token = req.headers['x-auth-token'];

    //Check if token exist
    if(token){

        try {
            const decoded = await jwt.verify(token, config.get('jwtSecret') )

            const { user} = decoded;

            req.user = user;

            next();

        } catch (error) {

            console.log('err-decode-token', error.message)

            res.status(401).json({msg: 'It\'s not valid token ..' })
        }
        

    }else{

       return res.status(401).json({ msg: "Not token , authorization denied" });
    }


 };


 module.exports = protectedRoute;