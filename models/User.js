const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema;


const UserSchema = new Schema({

    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        set: emailtoLower
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,

    },
    invitation:{
        type:Number,
        default: 0
    },
    followers:[
      {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
      }
    ],
    date:{
        type: Date,
        default : Date.now
    }



})  ;






/**
 * Hook Mongoose
 * encrypt password 
 * with brcryp.
 */
 UserSchema.pre('save', async function (next) {

        const user = this; //instance du model encours

        if(!user.isModified || !user.isNew){

            next();

        }else{

            try {
                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(user.password, salt);

                next();

            } catch (error) {
                console.log('hash-passxd-err', error.message);

                res.status(500).send({ errors: [{ msg : 'could not hash password'}]})
            }
        }
     
 })


/**
 * STATIC METHOD
 * Generate user token
 * @param {*} userID 
 */
UserSchema.statics.generateWebToken = async function(userID ){

    try {
        const payload ={
            user:{
                id: userID
            }
        }

        return await jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: config.get('expirationTime') }

        );

    } catch (error) {
        console.log('err-generate-token-user-save', error.message)

        res.status(500).send("server error");
        
    }
}



/**
 * STATIC METHOD
 * Generate Compare password on login
 * @param {*} user 
 */
UserSchema.statics.comparePasswd = async function (password, hash) {

    try {
        
        const isMatched = await bcrypt.compare(password, hash);

        return isMatched;

    } catch (error) {
        
        console.log('err-compare-passwd-user-onlogin', error.message)

        res.status(500).send("server error");
    }
}





/**
 * SETTER FUNCTION
 */
function emailtoLower(v) {
    return v.toLowerCase();
}




//MODEL
const User = mongoose.model("user", UserSchema);
module.exports = User;




/***
 * 
 * Un jeton se compose de trois parties:
 * Un en-tête (header), utilisé pour décrire le jeton. Il s'agit d'un objet JSON.
 * Une charge utile (payload) qui représente les informations embarquées dans le jeton. Il s'agit également d'un objet JSON.
 * Une signature numérique.
 */