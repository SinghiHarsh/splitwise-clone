const Balance = require('../models/balances');
const mongoose = require('mongoose')

exports.finalCalculatedBal = (req,res,next) => {
    var {groupId} = req.body;
    
    Balance.aggregate([
        {
            $match: { 
                groupId: mongoose.Types.ObjectId(groupId)
            }
        },
        {
            $addFields: {
                totalLentValue: { $sum: "$amountLent.lentAmount" },
                totalDebtValue: { $sum: "$amountDebt.debtAmount" },
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "groupUserId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $project:{
                totalDebtValue:1, totalLentValue:1, groupUserId:1, "userData.name":1,
                finalValue:{
                    $cond:{
                        if: { $gte: [ "$totalLentValue", "$totalDebtValue" ] }  ,
                        then: { "getBacksValue": {$subtract: [ "$totalLentValue", "$totalDebtValue" ]} },
                        else: { "owesValue": {$subtract: [ "$totalDebtValue", "$totalLentValue" ]} }
                    }
                }
            }
        }
    ],
    (err,data)=>{
        if(err)
            return res.json({msg:err.message})
        return res.json(data)
    })
}