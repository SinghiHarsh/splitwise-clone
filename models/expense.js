var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = Schema({
    createdAt: {
        type: Date
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    description: {
        type: String,
        required: true
    },
    amountPaidBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
    totalAmountPaid: {
        type: Number
    },
    splitBetween:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lentValue: {
        type:Number
    },
    debtValue: {
        type: Number
    }
})

var Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense;