var Friend = require('../models/friends')
var User = require('../models/users')

exports.acceptRequest = (req,res,next) =>{
    // This is the request id: the app user is accepting
    var {reqSentId} = req.body
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db)=>{
        if(err){
            return res.json({msg:err.message})
        }
        if(db){
            Friend.findOneAndDelete({
                $and:[
                    {request_sent: reqSentId},
                    {request_receive: db._id}
                ]
            })
            .exec((err,db1)=>{
                if(err)
                    return res.json({msg: err.message})
                if(db1){
                    User.find({
                        $or:[
                            {_id:{$eq:db1.request_receive}},
                            {_id:{$eq:db1.request_sent}}
                        ]
                    },{password:0})
                    .exec((err,db2)=>{
                        if(err)
                            return res.json({msg:err.message})
                        if(db2){
                            db2.map((el)=>{
                                if(el._id == req.user_id){
                                    User.findOneAndUpdate(
                                        {_id:{$eq:el._id}},
                                        {$push:{friends: reqSentId}},
                                        {safe: true},
                                        (err,db3)=>{
                                            if(err)
                                            return res.json({msg: err.message})
                                        }
                                    )
                                }
                                else {
                                    User.findOneAndUpdate(
                                        {_id:{$eq:el._id}},
                                        {$push:{friends: req.user_id}},
                                        {safe: true},
                                        (err,db3)=>{
                                            if(err)
                                            return res.json({msg: err.message})
                                        }
                                    )
                                }
                            })
                            return res.json({msg:'Friend added'})
                        }
                    })
                }
            })
        }
        else {
            return res.json({msg:'No db found'})
        }
    })
}