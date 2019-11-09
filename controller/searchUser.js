// var jwt = require('jsonwebtoken')

var User = require('../models/users')

alreadyFriend = (db,search_user) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username:{$eq:search_user}
        }).select("-password")
        .exec((err,db1)=>{
            if(err)
                return reject(err)
        if(db1){
            if(db.friends.includes(db1._id)){
                return resolve("Already Friends")
            }
            else{
                return resolve(db1)
            }
        }
        else{
            return resolve("No users found")
        }
        })
    });
}

exports.searchUser = (req,res,next) =>{
    let {search_user} = req.body
    console.log(req.user_id)
    User.findOne(
        {_id: {$eq:req.user_id}
    }).select("-password")
    .exec((err,db)=>{
        if(err)
            return res.json({msg:err})
        alreadyFriend(db,search_user)
        .then(response=>{
            return res.json(response)
        })
        .catch(err=>{
            return res.json({msg:err})
        })
    })
}