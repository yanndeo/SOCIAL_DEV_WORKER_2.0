const express = require('express')
const router = express();
//Models
const User = require('../../models/User')
const Profile = require("../../models/Profile");

//Middleware
const isProtected = require("../../middleware/check-token");

//Validation
const { validationResult } = require('express-validator');
const checkedRequest = require('../../validations/ProfileValidation');


/**
 * @routes GET api/profile/me
 * @desc Recuperer le profile de l'utilisateur courrant
 * @access Private
 */
router.get('/me', isProtected, async(req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
                                     .populate('user',['name', 'avatar'])

        if(!profile)
            return res.status(400).json({ msg: 'There are not profile for this user '});
        else
            return res.json(profile);


    } catch (error) {

        console.log('err-profile-me', error.message)
        res.status(500).send('Server Error')
        
    }
    
});





/**
 * @routes POST api/profile
 * @desc Ajouter/MAJ son profile
 * @access Private
 */
router.post('/', isProtected, checkedRequest.onSubmitProfile, async(req, res)=>{

   
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { company , website, location, bio, status, githubusername, skills, youtube, facebook, twitter , instagram, linkedin } = req.body

    //Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim() ) ;
    } 

    //Build social object
    profileFields.social = {}   // if not initialize  we have undefined

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook =facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;


    try {

        let profile = await Profile.findOne({ user: req.user.id });
          
            //CREATE
        if(!profile || profile === null){

            profile = new Profile(profileFields);

            await profile.save();

            //return res.json(profile)

        }else{
            //UPDATE
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id},
                { $set :profileFields },
                { new : true}
            );

            //return res.json(profile)          
        }


        return res.json(profile)

        
    } catch (error) {
        console.log('err-profile-add-or-updating', error.message)
        res.status(500).send('Server Error')
    }




});












/**
 * @routes GET api/profile
 * @desc Recuperer tous les profiles users
 * @access Public
 */
router.get('/', async(req, res)=>{

    try {

        const profiles = await Profile.find().populate('user', ['name', 'avatar'])


        return res.json(profiles);

    } catch (error) {
        console.log('err-profile-getall', error.message)
        res.status(500).send('Server Error')
    }

})



/**
 * @routes GET api/profile/user/useID
 * @desc Recuperer le profiles d'un  by userID
 * @access Public
 */
router.get('/user/:userID', async(req, res)=>{

    try {

       
         const profile = await Profile.findOne({ user: req.params.userID }).populate('user', ['name', 'avatar'])

            if (!profile) {

                return res.status(400).json({ msg: 'Profile not found' });
            }
            else{
                return res.json(profile);
            }
    
    } catch (error) {
        if (error.king == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        console.log('err-profile-getbyuserID', error)
        res.status(500).send('Server Error')
    }
    

});





module.exports = router;



/**
 * split() => renvoi un [] d'items sur la base du seperateur .
 * map() => creer un nouveau [] avec les resultats de l'appel d'une function .
 */