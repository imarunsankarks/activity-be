const Workout = require('../schema/workout')
const mongoose = require('mongoose');

// get all
const getAll = async (req, res) => {
    try {
        let workouts = await Workout.find().sort({ createdAt: -1 })

        if (!workouts) {
            return res.status(404).json({ message: 'No workouts found' });
        }
        else {
            res.status(200).json(workouts);
        }
    } catch (err) {
        console.log("Error getting workouts", err);
        res.status(500).json({ message: 'Server error' });
    }
}

// get one
const getOne = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such workout' })
    }
    try {
        let workout = await Workout.findById(id)
        if (!workout) {
            return res.status(404).json({ message: 'No workout found' });
        }
        else {
            res.status(200).json(workout);
        }
    } catch (err) {
        console.log("Error getting workouts", err);
        res.status(500).json({ message: 'Server error' });
    }
}
// post an activity
const postActivity = async (req, res) => {
    const { title, description } = req.body
    try {
        const workout = await Workout.create({ title, description })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.deleteOne({ _id: id })
        if (!workout) {
            return res.status(404).json('Workout not found')
        } else {
            res.status(200).json('Deleted the workout')
        }
    } catch {
        res.status(500).send('server error')
    }
}

const updateOne = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
        if (!workout) {
            return res.status(404).json('Workout not found')
        } else {
            res.status(200).json(workout)
        }
    } catch {
        res.status(500).send('server error')
    }
}

module.exports = {
    postActivity, getAll, getOne, deleteOne, updateOne
}