const express = require('express');

const {
    signup,
    login,
    updateProfilePhoto,
    deleteAcc
} = require('../controllers/userControllers')

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login)
router.post('/updateProfilePhoto', updateProfilePhoto);
router.delete('/:id', deleteAcc)
module.exports = router;
