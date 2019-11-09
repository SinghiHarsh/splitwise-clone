const User = require('../models/users')
const Balance = require('../models/balances')

exports.finalBalance = (req,res,next) => {
    var {groupId} = req.body;
    User.findOne({
        _id: {$eq:req.user_id}
    })
    .exec((err,db)=>{
        if(err)
            return res.json({msg:err.message})
        if(db){
            Balance.find(
                {groupId: {$eq:groupId}}
            )
            .exec((err,groups)=>{
                if(err)
                    return res.json({msg:err.message})
                return res.json(groups)
            })
        }
        else{
            return res.json({msg:'User does not exists'})
        }
    })
}