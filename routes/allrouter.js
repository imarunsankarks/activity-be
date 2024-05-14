const express = require('express')
const {
    postActivity, getAll, getOne, deleteOne, updateOne
} = require('../controllers/allcontrollers')
const router = express.Router()
// GET all 
router.get('/', getAll)

router.get('/:id', getOne)

router.post('/', postActivity)

router.delete('/:id', deleteOne)

router.patch('/:id', updateOne)

module.exports = router