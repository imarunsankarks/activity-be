const User = require('../schema/user');
const jwt = require('jsonwebtoken');

// create token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' });
};

// signup
const signup = async (req, res) => {
    const { userid, password } = req.body;
    try {
        const user = await User.signup(userid, password);
        const token = createToken(user._id);
        res.status(200).json({ userid, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// login
const login = async (req, res) => {
    const { userid, password } = req.body;
    try {
        const user = await User.login(userid, password);
        const token = createToken(user._id);
        const profilePhoto = user.profilePhoto;
        res.status(200).json({ userid, token, profilePhoto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update profile photo
const updateProfilePhoto = async (req, res) => {
    const { profilePhoto, userid } = req.body;

    try {
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.profilePhoto = profilePhoto;
        await user.save();

        res.status(200).json({ profilePhoto: user.profilePhoto });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile picture' });
    }
};

module.exports = {
    signup,
    login,
    updateProfilePhoto
};
