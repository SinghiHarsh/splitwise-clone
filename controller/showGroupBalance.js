const User = require('../models/users')
const Balance = require('../models/balances')

exports.showGroupBalance = (req,res,next) => {
    var {groupId} = req.body;
    User.findOne({
        _id:{$eq:req.user_id}
    })
    .exec((err,db)=>{
        if(err)
            return res.json({msg:err.message})
        if(db){
            Balance.find({
                groupId: {$eq:groupId}
            })
            .populate('groupUserId',{'name':1})
            .populate('amountDebt.amountDebtToId','name')
            .populate('amountLent.amountLentToId','name')
            // .setOptions({explain: 'executionStats'})             
            .exec((err,transactions)=>{
                if(err)
                    return res.json({msg:err.message})
                return res.json(transactions)
            })
        }
    })
}