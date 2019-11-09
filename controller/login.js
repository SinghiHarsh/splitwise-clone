var User = require('../models/users')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const findUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id:id
        })
        .populate('friends')
        .populate('groups')
        .exec((err,user)=>{
            if(err)
                return reject(err.message)
            resolve(user)
        })
    });
}

const createToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { 
            id 
        }
        jwt.sign(payload, 'secret', {expiresIn:360000}, (err,token)=>{
            if(err)
                return reject(err.message)
            return resolve({token})
        }) 
    });
}

exports.login = (req,res,next) => {
    var {email_id, password} = req.body
    User.findOne({email_id})
    .exec(function(err,db){
        if(err)
            return res.json({msg:err.message})
        if(db){
            bcrypt.compare(password, db.password, function(err,response){
                if(err){
                    return res.json({msg:err})
                }
                if(response){
                    findUser(db._id)
                    .then(user=>{
                        createToken(user._id)
                        .then(token=>{
                            return res.json({
                                msg:"User logged In successfully",
                                user, token
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
                else {
                    return res.json({msg:'Invalid password'})
                }
            })
        }
        else {
            return res.json({msg:'Email id does not exsists'})
        }
    })
}