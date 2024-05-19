const mongoose = require('mongoose');

const Schema = mongoose.Schema

const activitySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity