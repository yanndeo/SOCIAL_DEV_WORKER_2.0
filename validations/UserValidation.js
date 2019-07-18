const { check } = require("express-validator");

module.exports = {

    onRegister: [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valide email').isEmail(),
        check('password', 'Please enter a password with 6 or more characteres').isLength({ min: 6 })

    ],

    onLogin: [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ]
}