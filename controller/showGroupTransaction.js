const Expense = require('../models/expense')
const User = require('../models/users')

exports.showGroupTransaction = (req,res,next) => {
    const {groupId} = req.body
    User.findOne({
        _id: {$eq:req.user_id}
    })
    .exec((err,db)=>{
        if(err)
            return res.json({msg:err.message})
        if(db){
            Expense.find(
                {groupId: {$eq:groupId}}
            )
            .populate('amountPaidBy',{"name":1})
            .populate('splitBetween',{'name':1})
            .exec((err,data)=>{
                if(err)
                    return res.json({msg:err.message})
                return res.json(data)
            })
        }
    })
}