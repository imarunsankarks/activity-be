const mongoose = require('mongoose');

const Schema = mongoose.Schema

const activitySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        date: {
            type: Date,
        }
    },
    { timestamps: true }
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity