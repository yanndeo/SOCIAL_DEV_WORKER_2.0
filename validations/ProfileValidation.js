const { check } = require("express-validator");

module.exports = {

    onSubmitProfile: [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty(),

    ],

    onPutExperience: [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),

    ],

    onPutEducation: [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study date is required').not().isEmpty(),
        check('from', 'from is required').not().isEmpty(),

    ],
   
}