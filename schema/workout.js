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
        },
        source:{
            type: String,
            enum: ['upi', 'card','cash'],
        },
        type: {
            type: String,
            enum: ['expense', 'savings'],
            required: true
        }
    },
    { timestamps: true }
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity