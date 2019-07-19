const { check } = require("express-validator");

module.exports = {

    onSubmitProfile: [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty(),

    ],

   
}