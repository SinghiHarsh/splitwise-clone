var User = require('../models/users')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

exports.register = (req,res,next) => {
    let {
        username,
        name,
        mobile_number,
        email_id,
        password
    } = req.body
    User.findOne({username})
    .exec((err,db)=>{
        if(err)
            return res.json({err})
        if(!db){
            bcrypt.genSalt(10, function(err, salt){ 
                bcrypt.hash(password,salt,function(err, hash){
                    if(err){
                        return res.json({err})
                    }
                    let user = new User({username,name,mobile_number,email_id,password:hash})
                    let payload = {
                        id: user._id
                    }
                    jwt.sign(payload,'secret',{expiresIn: 3600000},function(err,token){
                        if(err)
                            return res.json({err})
                        user.save((err,db)=>{
                            if(err)
                                return res.json({err})
                            return res.json({msg:'User created successfully', data:db , token})
                        })
                    })     
                })
            })
        }
        else {
            return res.json({msg: 'User already exsists'})
        }
    })
}