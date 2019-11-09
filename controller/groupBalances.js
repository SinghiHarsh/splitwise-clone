const Group = require('../models/groups');
const User = require('../models/users');
const Expense = require('../models/expense');

exports.groupBalance = (req,res,next) => {
    var {groupId} = req.body;
    Group.findOne({_id: {$eq:groupId}})
    .exec((err,db)=>{
        if(err)
            return res.json({msg: err.message})
        if(db){
            db.groupMembers.forEach(Element=>{        
                Expense.find({})
                .exec((err,db1)=>{
                    if(err)
                        return res.json({msg: err.message})
                    db1.forEach(Element1=>{
                        if(Element == Element1.amountPaidBy.user){
                            console.log("checked")
                        }
                    })
                })
            })
            return res.json({msg:"Hello"})
        }
    })
}