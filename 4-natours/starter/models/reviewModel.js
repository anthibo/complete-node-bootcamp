// review / rating/ createdAt / ref to the tour / ref to the user 
const mongoose = require('mongoose')

const Tour = require('./tourModel')
const User = require('./userModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be empty']
    },
    rating: {
        type: Number,
        min: [1, 'rating must be above 1'],
        max: [5, 'rating must be below 5']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, ' Review must belong to a tour.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, ' Review must belong to a user.']
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next()
})




const Review = new mongoose.model('Review', reviewSchema)
module.exports = Review