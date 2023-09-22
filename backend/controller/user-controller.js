const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const googleSheetService = require('../apis/googleSheetService');

const {authLogin} = googleSheetService;

const login= async (req,res,next)=>{
 const {email,password} = req.body;
 let credentials 
 try{
    credentials = authLogin();

 }catch(error){
    return next({error:'Error fetching login credentials'})
    
 }
 let isValid = false;
 try{
    const isValidEmail = await bCrypt.compare(email,credentials.email)
    const isValidPassword = await bCrypt.compare(password, credentials.password);
    isValid = isValidEmail && isValidPassword;
 }catch(error){
    return next({error:'Invalid Credentials'})
 }
 let token;
 try{
    token = jwt.sign({email},'private_token',{expiresIn :'1h'});
 }catch(error){
    return next({error:'Erorr loggin in.'})
 }
 res.json({token})

}


exports.login = login;
