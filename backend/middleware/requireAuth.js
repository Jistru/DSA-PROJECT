const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (request, response, next) => {


    //verify authentication
    const { authorization } = request.headers

    if ( !authorization ) {
        return response.status(401).json({error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        request.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        response.status(401).json({error: 'Unauthorized request'})
    }

}

module.exports = requireAuth