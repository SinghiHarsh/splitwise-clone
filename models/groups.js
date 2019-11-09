var mongoose = require('mongoose')
var Schema = mongoose.Schema

var groupSchema = Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    groupName: {
        type: String,
        required: true
    },
    groupMembers: [{
        // amount:[Number],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    simplyfyDebt: {
        type: Boolean,
        default: false
    }
})

var Group = mongoose.model('Group', groupSchema)

module.exports = Group;

