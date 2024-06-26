const User = require('../schema/user')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// create token
const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'2d'})
} 

// signup

const signup = async (req, res) => {
    const { userid, password } = req.body;
    try {
        const user = await User.signup(userid, password)
        const token = createToken(user._id)
        res.status(200).json({ userid, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { userid, password } = req.body
    try {
        const user = await User.login(userid, password)

        const token = createToken(user._id)
        res.status(200).json({ userid, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports = {
    signup,
    login
}