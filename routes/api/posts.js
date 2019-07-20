const express =require('express')
const router = express();
//Models
const User = require('../../models/User')
const Post = require("../../models/Post");
//Middleware
const isProtected = require("../../middleware/check-token");
//Validation
const { validationResult } = require('express-validator');
const checkedRequest = require('../../validations/PostValidation');



/**
 * @route POST /api/posts
 * @desc Create a post 
 * @access Private
 */
router.post('/',isProtected, checkedRequest.onSubmitPost, async(req, res )=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const user = await User.findById(req.user.id);

        const post = new Post({
            text: req.body.text,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        });

        await post.save();

        return res.json(post)

         
    } catch (error) {
        console.log('err-post-add:',error.message)
       return res.status(500).json('Server error')
    }

});




/**
 * @route GET /api/posts
 * @desc Recupere tous les posts
 * @access public
 */
router.get('/', isProtected,  async(req, res)=>{

    try {
        
        const posts = await Post.find().sort({ date: -1}).select('-user');

        if(!posts || posts === null)
            return res.status(400).json({ msg: 'Posts not found'});
        else
            return res.json(posts)

    } catch (error) {
        console.log('err-post-all:', error.message)
        return res.status(500).json('Server error')
    }

});






/**
 * @route GET /api/posts/postID
 * @desc Recuperer un post
 * @acess private
 */
router.get('/:postID',isProtected,  async(req, res)=>{

    try {

        const post = await Post.findById(req.params.postID);

        if(!post)
            return res.status(404).json({ msg : 'Post not founded'})
        else
            return res.json(post)
        
        
    } catch (error) {
        console.log("err-post-getapost:", error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: ' Post not exist ...' })
        }
        return res.status(500).json("Server error");
    }



});







/**
 * @route DELETE /api/posts/postID
 * @desc Supprimer a post
 * @access Private
 */
router.delete('/:postID', isProtected, async(req, res)=>{

    try {

        const post = await Post.findById(req.params.postID);
    
        if(!post){

            return res.status(404).json({ msg: 'Post not found  !!!' })

        }else{
            //make sure user logged is author 's post

            if (post && post.user.toString() === req.user.id){

                //await Post.findByIdAndRemove(req.params.postID).exec();
                await post.remove();

                return res.json({ msg: 'Post it\'s deleted successfully' })

            } else {

                return res.status(401).json("You\'are not authorized to delete this post");
            }

        }
   
    } catch (error) {
        console.log("err-post-delete:", error.message);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg :' Post not exist ...'})
        }
        return res.status(500).json("Server error");
    }

});







module.exports =router