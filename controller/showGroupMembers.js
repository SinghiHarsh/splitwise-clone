const User = require('../models/users')
const Group = require('../models/groups')

exports.showGroupMembers = (req,res,next) => {
    var {groupId} = req.body
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db)=>{
        if(err)
            return res.json({msg:err.message})
        if(db){
            Group.findOne({_id:{$eq: groupId}})
            .populate('createdBy', {'name':1})
            .populate('groupMembers',{'name':1})
            .exec((err,db1)=>{
                if(err)
                    return res.json({msg: err})
                return res.json(db1)
            })
        }
    })
}