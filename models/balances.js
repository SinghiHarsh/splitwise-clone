const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    groupUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // you have to pay for someone
    amountDebt:[{
        debtAmount:Number,
        amountDebtToId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    // you paid for someone
    amountLent:[{
        lentAmount:Number,
        amountLentToId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;