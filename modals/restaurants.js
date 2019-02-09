const mongoose = require('mongoose');
const rest = require('./restaurants.json')

const restaurantSchema = mongoose.Schema({
    "id":Number,
    "photos_url": String,
    "user_rating": {},
    "name":String,
    "cuisines": String,
    "has_table_booking": Number,
    "location": {},
    "featured_image": String,
    "thumb": String

},{versionKey: false})

let restaurant = module.exports = mongoose.model('restaurant', restaurantSchema)

// restaurant.insertMany(rest)