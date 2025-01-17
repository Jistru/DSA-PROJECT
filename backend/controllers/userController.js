const User = require('../models/userModel')

// login user
const loginUser = async (request, response) => {
    response.json({mssg: 'login user' })
}

// sigup user
const signupUser = async (request, response) => {
    response.json({mssg: 'signup user' })
}

module.exports = { signupUser, loginUser }