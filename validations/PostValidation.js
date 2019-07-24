const { check } = require("express-validator");

module.exports = {

    onSubmitPost: [
        check('text', 'Text is required').not().isEmpty(),

    ],
    onPostComment: [
        check('text', 'Text is required').not().isEmpty(),

    ],


 
}