const express = require('express');

const {
    signup,
    login,
    updateProfilePhoto
} = require('../controllers/userControllers')

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login)
router.post('/updateProfilePhoto', updateProfilePhoto);

module.exports = router;
