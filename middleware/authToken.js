var jwt = require('jsonwebtoken')

exports.verifyToken = (req,res,next) => {
    const token = req.header('x-auth-token')
    if(!token) {
        return res.json({msg: 'No token, authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, 'secret')
        req.user_id = decoded.id
        next()
    }
    catch(err){
        res.json({msg: 'Token is invalid'})
    }
}