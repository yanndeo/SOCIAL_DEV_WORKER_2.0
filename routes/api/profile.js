const express = require('express')
const router = express();
const request = require('request');
const config = require('config');
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

    const { company , website, location, bio, status, githubUsername, skills, youtube, facebook, twitter , instagram, linkedin } = req.body

    //Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githUbusername = githubUsername;
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
        if(!profile || profile === null ){

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
        console.log('err-profile-add-or-updating:', error.message)
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
        console.log('err-profile-getall:', error.message)
        res.status(500).send('Server Error')
    }

})








/**
 * @routes GET api/profile/user/useID
 * @desc Recuperer le profiles d'un user by userID
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
        console.log('err-profile-getbyuserID:', error)
        res.status(500).send('Server Error')
    }
    

});






/**
 * @route DELETE /api/profile
 * @desc Suppresion du profile
 * @desc Suppression d'un user.
 * @desc Suppression de ces posts
 * @access Private
 */
router.delete('/' , isProtected, async(req, res)=>{

    try {

        //remove users posts

        //remove profile user
        await Profile.findOneAndRemove({ user: req.user.id});

        //remove user
        await User.findOneAndRemove({ _id: req.user.id });


        res.json({ msg :'User deleted '})


    } catch (error) {
        if (error.kind =='ObjectId'){
            return res.json({ msg :' User not founded'})
        } 

        console.log('err-profile-getbyuserID:', error)
        res.status(500).send('Server Error')
    }


});








/**
 * @route PUT /api/profile/experience
 * @desc Add profile experience 
 * @access Private
 */
router.put('/experience', isProtected, checkedRequest.onPutExperience,  async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body ;

    try {
        
        let profile = await Profile.findOne({ user : req.user.id })

        if(!profile){
            return res.status(400).json({ msg :'Profile not fount'})
        }else{

            const newExp = {}

            if (title) newExp.title = title;
            if (company) newExp.company = company;
            if (location) newExp.location = location;
            if (from) newExp.from = from;
            if (to) newExp.to = to;
            if (current) newExp.current = current;
            if (description) newExp.description = description;

            profile.experience.unshift(newExp);

            await profile.save();

            return res.json(profile);

        }

    } catch (error) {
        console.log("err-profile-add-experience:", error);
        res.status(500).send("Server Error");
    }


});






/**
 * @route DELETE api/profile/experience/expID
 * @desc Supprimer une experience (objet)
 * @access Private
 */
router.delete('/experience/:expID',isProtected, async(req, res)=>{

        try {

            const profile = await Profile.findOne({ user :req.user.id});         

            if (!profile) {

                return res.status(400).json({ msg: 'Profile not fount' })

            } else {

                //parcourant les items experiences pour en ressortir juste un [] d'id et checkons l'existance de expID avec un indexOf
                let indiceExp = profile.experience.map(item => item.id)
                                                  .indexOf(req.params.expID );

                profile.experience.splice(indiceExp , 1)

                await profile.save()

                return res.json(profile)

                } 

        } catch (error) {
            if(error.kind =='objectId'){
                return res.status(400).json({ msg :'Experience not found'})
            }
            console.log("err-profile-delete-experience:", error);
            res.status(500).send("Server Error");
        }

});







/**
 * @route PUT /api/profile/education
 * @desc Rajouter/Modifier a son profile 
 * @desc des elements lié à la formation son parcours
 * @access Private
 */
router.put('/education', isProtected, checkedRequest.onPutEducation, async(req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({ errors : errors.array()})
    }


    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

   try {
    
       let profile = await Profile.findOne({ user: req.user.id });

       if (!profile) {

           return res.status(400).json({ msg: 'Profile not found' })

       } else {
           const newEdu = { school, degree, fieldofstudy, from, to, current, description } ;
           profile.education.unshift(newEdu);
           profile.save();
           return res.json(profile);
       }

   } catch (error) {
       console.log("err-profile-add-education:", error);
       res.status(500).send("Server Error");
   }

});








/**
 * @route DELETE /api/edcation/eduID
 * @desc supprimons l'item education.item par item.
 * @access Private
 */
router.delete('/education/:eduID', isProtected, async(req, res)=>{



    try {
        
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {

            return res.status(400).json({ msg: 'Profile not found' })

        } else {

            const indiceEdu = profile.education.map(item => item.id)
                                               .indexOf(req.params.eduID);


                if(indiceEdu !== -1){
                    
                    profile.education.splice(indiceEdu, 1)

                    await profile.save();

                    return res.json(profile);
                }

                 return res.status(400).json({ msg: 'Education item not found' })

        }


    } catch (error) {
        if (error.kind == 'objectId') {
            return res.status(400).json({ msg: 'Education item not found ..' })
        }
        console.log("err-profile-delete-experience:", error);
        res.status(500).send("Server Error");
    
    }

    

});




/**
 * @route GET api/profile/github/:username
 * @desc GET user repos from Github
 * @access Public 
 */
router.get('/github/:username', (req, res)=>{

    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
            client_id=${config.get('githubCliendID')}&client_secret=${config.get('githubSecret') } `,
            method:'GET',
            headers:{'user-agent': 'node.js' }
        };

        //Make a request 
        request(options, (error, response,body)=>{

            if(error) console.error(error);

            if(response.statusCode !== 200){
               return res.status(404).json({ msg: 'No Github profile found' })
            }

           return res.json(JSON.parse(body))
        })

        

    } catch (error) {
        console.log("err-profile-github:", error.message);
        res.status(500).send("Server Error");

    }
} )


























module.exports = router;



/**
 * split() => renvoi un [] d'items sur la base du seperateur .
 * map() => creer un nouveau [] avec les resultats de l'appel d'une function .
 * 
 * -La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments
 * splice(x, 1)= > retire x du tableau. 
 * splice(x,0) => ajoute x
 */