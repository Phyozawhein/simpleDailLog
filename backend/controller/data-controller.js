const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const googleSheetService = require('../apis/googleSheetService');

const {getInventory, authLogin}= googleSheetService;



const login= async (req,res,next)=>{
    const {email,password} = req.body;
    let credentials ;
    if (!email || !password){
      return next( 'Please fill out all the credentials.')
    }
    try{
       credentials = await authLogin();
      
    }catch(error){
       return next('Error fetching login credentials: '+error.message)
       
    }
    let isValid = false;
    try{
       const isValidEmail = await bCrypt.compare(email,credentials.email)
       const isValidPassword = await bCrypt.compare(password, credentials.password);
       isValid = isValidEmail && isValidPassword;
    }catch(error){
       res.json('Invalid Credentials')
    }
    if(isValid){
      let token;
      try{
         token = jwt.sign({email},'private_token',{expiresIn :'1h'});
      }catch(error){
         res.json('Erorr logging in.')
      }
      res.json({token})
    }
    else{
      res.json({message:'Invalid credentials',code:404})
    }
   }

const listPackage = async(req,res,next)=>{
    let packages=[]
    try{
        const pkgs = await getInventory();
        for (let i =0;i<pkgs.length; i++){
         packages.push({"apt":pkgs[i][0], "packages": pkgs[i][1]})
        }
    }catch(error){
        return res.json( new Error('Error fetching package invenotry '+error.message))
    }

    res.json(packages)

}


exports.listPackage = listPackage;
exports.login = login;