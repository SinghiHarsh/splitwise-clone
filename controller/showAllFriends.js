var User = require('../models/users')

exports.allFriends = (req,res,next) => {
    User.findOne({_id:{$eq:req.user_id}},{password:0})
    .populate('friends',{"friends":0, "password":0})
    .exec((err,db)=>{
        console.log(db)
        if(err)
            return res.json({msg:err.message})
        return res.json(db)
    })
}