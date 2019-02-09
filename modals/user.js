const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    "name":String,
    "email":String,
    "password":String,
    "booking":Array,
    "address":String,
    "phone":String,
    "payment":String,
    "photoUrl":String

    },{ versionKey: false })


    let users = module.exports = mongoose.model('users', userSchema)

// users.insertMany([{
//     "name" : 'vishal',
//     "email": "abc@gmail.com",
//      "password": "1245323",
//      "booking":[],
//      "phone": 123456789,
//      'payment': 'paytm'
// }])