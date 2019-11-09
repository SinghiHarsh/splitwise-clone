const User = require('../models/users');
const Expense = require('../models/expense');
const Balance = require('../models/balances');

exports.addGroupExpense = (req,res,next) => {
    var {
        groupId,
        description,
        amountPaidBy,
        totalAmountPaid,
        splitBetween,
        debtValue,
        lentValue
    } = req.body
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db) => {
        if(err)
            return res.json({msg: err.message})
        if(db){
            Balance.find(
                {groupId: {$eq:groupId}}
            )
            .exec((err,db)=>{
                if(err)
                    return res.json({msg:err.message})
                if(db.length == 0){
                    var tempArray = []
                    splitBetween.forEach(id=>{
                        if(id !== amountPaidBy){
                            var balanceDebt = new Balance({
                                groupId,
                                groupUserId:id,
                                amountDebt:{
                                    debtAmount: debtValue,
                                    amountDebtToId: amountPaidBy
                                }
                            }).save();
                            tempArray.push({lentAmount:lentValue, amountLentToId:id})
                        }
                    })
                    var balanceLent = new Balance({
                        groupId,
                        groupUserId: amountPaidBy,
                        amountLent: tempArray
                    })
                    balanceLent.save();
                    var expen = new Expense({
                        groupId,
                        description,
                        amountPaidBy,
                        totalAmountPaid,
                        splitBetween,
                        debtValue,
                        lentValue
                    })
                    expen.save();
                    return res.json({msg: "Expense added"});
                }
                else{
                    var users = []
                    var newSplitBetween = splitBetween.filter(id=>{
                        return id !== amountPaidBy
                    })
                    db.map(amountUpdate=>{
                        users.push(amountUpdate.groupUserId.toString())
                        if(amountUpdate.groupUserId.toString() === amountPaidBy){
                            var alreadyPresent = amountUpdate.amountLent.map(el=>{
                                return el.amountLentToId.toString()
                            })
                            var newUsers = newSplitBetween.filter(id => !alreadyPresent.includes(id))
                            if(amountUpdate.amountLent.length > 0){
                                amountUpdate.amountLent.map(user=>{
                                    newSplitBetween.map(id=>{
                                        if(user.amountLentToId.toString() === id){
                                            user.lentAmount = user.lentAmount + lentValue
                                        }
                                    })
                                })
                            }
                            newUsers.map(id=>{
                                amountUpdate.amountLent.push({lentAmount:lentValue, amountLentToId:id})
                            })
                        }
                        else{
                            if(newSplitBetween.includes(amountUpdate.groupUserId.toString())){
                                var alreadyUsers = []
                                if(amountUpdate.amountDebt.length > 0){
                                    amountUpdate.amountDebt.map(el=>{
                                        alreadyUsers.push(el.amountDebtToId.toString())
                                        if(el.amountDebtToId.toString() === amountPaidBy){
                                            el.debtAmount = el.debtAmount + debtValue
                                        }
                                    })
                                }
                                if(!alreadyUsers.includes(amountPaidBy)){
                                    amountUpdate.amountDebt.push({debtAmount: debtValue, amountDebtToId:amountPaidBy})
                                }
                            }
                        }
                        amountUpdate.save();
                    })
                    newUsers = newSplitBetween.filter(id=> !users.includes(id))
                    if(!users.includes(amountPaidBy)){
                        newUsers.push(amountPaidBy)
                    }
                    if(newUsers.length > 0){
                        console.log("PROBLEM");
                        newUsers.forEach(id=>{
                            if(id === amountPaidBy){
                                lentArray = []
                                newSplitBetween.forEach(id=>{
                                    lentArray.push({
                                        lentAmount:lentValue,
                                        amountLentToId:id
                                    })
                                })
                                var lentBalance = new Balance({
                                    groupId,
                                    groupUserId:amountPaidBy,
                                    amountLent:lentArray
                                })
                                lentBalance.save();
                            }
                            else{
                                var debtBalance = new Balance({
                                    groupId,
                                    groupUserId:id,
                                    amountDebt:{
                                        debtAmount: debtValue,
                                        amountDebtToId: amountPaidBy
                                    }
                                })
                                debtBalance.save();
                            }
                        })
                    }
                    var expen = new Expense({
                        groupId,
                        description,
                        amountPaidBy,
                        totalAmountPaid,
                        splitBetween,
                        debtValue,
                        lentValue
                    })
                    expen.save();
                    return res.json({msg:"Expense added"})
                }
            })
        }
    })
}
