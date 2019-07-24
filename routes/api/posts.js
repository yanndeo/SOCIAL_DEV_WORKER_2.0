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






/**
 * @route PUT /api/posts/like/:postID
 * @desc Like a post 
 * @access Private
 */
router.put('/like/:postID', isProtected, async(req, res)=>{


    try {
        
    const post = await Post.findById(req.params.postID)

        if(!post){
            return res.status(401).json({ msg:'Post not exist !!'})

        }else{
        //Check si le user est deja dans le [] , donc siil a dejà liked :)

        const indiceUser = post.likes.map(item => item.user.toString)
                                     .indexOf(req.user.id);
            // Il n'y est pas :ajoute le alors.
            if(indiceUser === -1){

                post.likes.unshift({ user: req.user.id })

                await post.save();

                return res.json(post)

              // I y est dejà : show msg already liked . 
            }else{
                post.likes.splice(indiceUser, 1);

                return res.status(400).json({ msg: 'Post already liked !!' })

            }

        }

    } catch (error) {
        console.log("err-post-like:", error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: ' Post not exist ...' })
        }
        return res.status(500).json("Server error");
    }

})









/**
 * @route PUT /api/posts/unlike/postID
 * @desc j'aime pas ce post'$
 * @desc on ne pas disliker un post si on l'a pas liker bien avant
 * @access Private
 */
router.put('/unlike/:postID', isProtected, async(req, res)=>{

   try {
       const post = await Post.findById(req.params.postID)

       if (!post) {
           return res.status(401).json({ msg: 'Post not exist !!' })

       }

        //verifions si l'user a dejà liker
        const indiceUser = post.likes.map(item => item.user.toString())
                                     .indexOf(req.user.id);

        if(indiceUser === -1){

            return res.status(401).json({ msg :'You\'re not yet liked this post '})

        }else{
            post.likes.splice(indiceUser, 1)

            await post.save();

            return res.json(post)
        }

   } catch (error) {
       console.log("err-post-unlike:", error.message);
       if(error.kind == 'ObjectId'){
           return res.status(401).json({ msg: 'Post not exist ..' })
       }
       return res.status(500).json("Server error");

   }


});






/**
 * @route  POST /api/posts/comment/postID
 * @desc Commenter un post
 * @access Private
 */
router.post('/comment/:postID',isProtected, checkedRequest.onPostComment, async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const post = await Post.findById(req.params.postID);

        const user = await User.findById(req.user.id);

        if (!post) {

            return res
                .status(401)
                .json({ msg: "Post not exist !!" });

        }else{
            const comment = {
              user: req.user.id,
              name: user.name,
              avatar: user.avatar,
              text: req.body.text
            };

            post.comment.unshift(comment);

            await post.save();

            return res.json(post.comment);
       
        }

    } catch (error) {
        console.log("err-post-addComment:", error.message);

        if (error.kind == 'ObjectId') {
            return res.status(401).json({ msg: 'Post not exist ..' })
        }
        return res.status(500).json("Server error");
    }
   


});







/**
 * @route DELETE /api/posts/comment/postID/commentID
 * @desc Je supprime mon commentaire
 * @access Private
 */
router.delete('/comment/:postID/:commentID', isProtected, async(req, res)=>{

    try {

        const post = await Post.findById(req.params.postID);

        if(!post){
            return res.status(401).json({ msg: 'Post not exist !!' })

        }

        //Find comment concerné
        const comment = post.comment.find(item => item.id === req.params.commentID)

            if(!comment){

                return res.status(401).json({ msg: 'comment doesn\'t exist !!' });

            }else{
                //check user 
                if(comment.user.toString() !== req.user.id ){
                    return res.status(401).json({ msg: 'User not authorized !!' });
                }
                //remodeIndex comment 
                const indiceComment = post.comment.map(item => item.id.toString())
                                                  .indexOf(req.params.commentID)

                /* const index = post.comment.map(item => item.user.toString())
                                          .indexOf(req.user.id) */
                
                post.comment.splice(indiceComment, 1)
                                                  
                await post.save()

                return res.json(post.comment)
            }
        
    } catch (error) {

         console.log("err-post-deleteComment:", error.message);

        if (error.kind == 'ObjectId') {
            return res.status(401).json({ msg: 'Post not exist ..' })
        }
        return res.status(500).json("Server error");
    }

})



/**
 * La méthode find() renvoie la valeur du premier élément trouvé dans 
 * le tableau qui respecte la condition donnée par la fonction 
 * de test passée en argument. Sinon, la valeur undefined est renvoyée.
 */








module.exports =router