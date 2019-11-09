const User = require('../models/users')
const Friend = require('../models/friends')

exports.sendUserRequest = (req,res,next) => {
    // id the user to whom request is to be sent
    let id = req.body.id
    let check_id = req.user_id
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,response)=>{
        if(err)
            return res.json({err})
        if(response){
            Friend.findOne({
                $and:[
                    {request_sent:{$eq:check_id}},
                    {request_receive:{$eq:id}}
                ]
            })
            .exec((err,db)=>{
                if(err)
                    return res.json({msg: err.message})
                if(db){
                    return res.json({msg:'Request already sent'})
                }
                else{
                    const newFriend = new Friend({
                        request_sent:check_id,
                        request_receive:id
                    })
                    .save((err,saved)=>{
                        if(err)
                            return res.json({msg:err.message})
                        return res.json({msg:'Friend request sent'})
                    })
                }
            })
        }
    })
}