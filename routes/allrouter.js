const express = require('express')
const {
    postActivity, getAll, getOne, deleteOne, updateOne
} = require('../controllers/allcontrollers')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)
// GET all 
router.get('/', getAll)

router.get('/:id', getOne)

router.post('/', postActivity)

router.delete('/:id', deleteOne)

router.patch('/:id', updateOne)

module.exports = router