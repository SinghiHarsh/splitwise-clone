var User = require('../models/users')
var Friend = require('../models/friends')

exports.showAllreq = (req,res,next) =>{
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db)=>{
        if(err)
            return res.json({err:err.message})
        if(db){
            Friend.find({request_receive:{$eq:db._id}})
            .populate('request_sent',{name:1,email_id:1})
            .exec((err,db1)=>{
                if(err)
                    return res.json({err:err.message})
                return res.json(db1)
            })
        }   
    })
}