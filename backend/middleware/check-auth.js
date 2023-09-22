const jwt =require('jsonwebtoken');
const googleSheetService = require('../apis/googleSheetService');
module.exports =(req,res,next)=>{
    try{const token =req.header.authroization.split('')[1];
        if(!token){
            throw(new Error('Authentication failed; Invalid Token!'))
        }
        next();
    
    }catch(error){
        return next(new Error('Authentication failed'))
    }
}