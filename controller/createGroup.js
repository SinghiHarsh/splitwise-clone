const Group = require('../models/groups');
const User  = require('../models/users')

const createGroupForUser = (db,groupName, groupMembers,simplyfyDebt) => {
    return new Promise((resolve, reject) => {
        var newGroup = new Group({
            createdBy: db._id,
            groupName,
            groupMembers,
            simplyfyDebt
        })
        .save((err,db1)=>{
            if(err)
                return reject(err.message)
            return resolve(db1)
        })
    });
}

const addGroupIdToUser = (id, groupMembers) => {
    return new Promise((resolve, reject) => {
        groupMembers.forEach(Element=>{
            User.findOneAndUpdate(
                {_id:Element},
                {$push: {groups:id} }
            )
            .exec((err,data)=>{
                if(err)
                    return reject(err.message)
            })
        })
        return resolve("ADDED ID'S TO THE USER");
    });
} 

exports.createGroup = (req,res,next)=>{
    var {groupName, groupMembers,simplyfyDebt} = req.body;
    let checkId = req.user_id;
    User.findOne({
        _id: {$eq: checkId}
    })
    .exec((err,db)=>{
        if(err)
            return res.json({err: err.message})
        if(db){
            if(groupMembers.length != 0){
                groupMembers.push(req.user_id); 
                createGroupForUser(db,groupName, groupMembers,simplyfyDebt)
                .then(Response=>{
                    addGroupIdToUser(Response._id, Response.groupMembers)
                    .then(Response1=>{
                        console.log(Response1)
                        return res.json({msg: "Group created successfully", Response})
                    })
                    .catch(err=>{
                        return res.json(err)
                    })
                })
                .catch(err=>{
                    return res.json(err)                    
                })
            }
            else{
                return res.json({msg:"Please add members"})
            }
        }
    })
}