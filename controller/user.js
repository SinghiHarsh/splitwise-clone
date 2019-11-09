const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.user = (req,res,next) =>{
    User.findOne({_id:{$eq:req.user_id}})
    .populate('friends','name')
    .populate('groups')
    .populate({
        path: "groups",
        populate: {
            path:"groupMembers"
        }
    })
    .exec((err,data)=>{
        if(err)
            return res.json({msg:err.message})
        return res.json(data)
    })
} 