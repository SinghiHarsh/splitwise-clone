var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required:true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    mobile_number:{
        type: String,
        required:true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groups:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
})

var User = mongoose.model('User', userSchema)

module.exports = User