var mongoose = require('mongoose')
var Schema = mongoose.Schema

var friendSchema = Schema({
    request_sent: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    request_receive: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}) 
var Friend = mongoose.model('Friend',friendSchema)

module.exports = Friend