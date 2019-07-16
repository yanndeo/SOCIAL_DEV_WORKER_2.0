const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({

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
 * SETTER FUNCTION
 */
function emailtoLower(v) {
    return v.toLowerCase();
}







//MODEL
const User = mongoose.model("users", UserSchema);
module.exports = User;