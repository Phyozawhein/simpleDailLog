const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const googleSheetService = require('../apis/googleSheetService');

const {getInventory, authLogin}= googleSheetService;



const login= async (req,res,next)=>{
    const {email,password} = req.body;
    let credentials 
    if (!email || !password){
      return next( 'Please fill out all the credentials.')
    }
    try{
       credentials = await authLogin();
      
    }catch(error){
       return next('Error fetching login credentials')
       
    }
    let isValid = false;
    try{
       const isValidEmail = await bCrypt.compare(email,credentials.email)
       const isValidPassword = await bCrypt.compare(password, credentials.password);
       isValid = isValidEmail && isValidPassword;
      // console.log(isValidEmail,isValidPassword,isValid)
    }catch(error){
       return next('Invalid Credentials')
    }
    let token;
    try{
       token = jwt.sign({email},'private_token',{expiresIn :'1h'});
    }catch(error){
       return next('Erorr loggin in.')
    }
    res.json({token})
   
   }

const listPackage = async(req,res,next)=>{
    let packages
    try{
        
        packages = await getInventory();
        
    }catch(error){
        return next( new Error('Error fetching package invenotry '+error.message))
    }
    res.json({packages})

}


exports.listPackage = listPackage;
exports.login = login;