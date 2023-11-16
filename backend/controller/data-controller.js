const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const googleSheetService = require('../apis/googleSheetService');
const HttpError =require('../models/http-error');
const {getInventory, logInventory, authLogin, updatePackageList}= googleSheetService;



const login= async (req,res,next)=>{
    const {email,password} = req.body;
    let credentials ;
    if (!email || !password){
      return next( new HttpError('Please fill out all the credentials.',422))
    }
    try{
       credentials = await authLogin();
      
    }catch(error){
       return next(new HttpError('Error fetching login credentials: '+error.message, 500))
    }
    let isValid = false;
    try{
       const isValidEmail = await bCrypt.compare(email,credentials.email)
       const isValidPassword = await bCrypt.compare(password, credentials.password);
       isValid = isValidEmail && isValidPassword;


    }catch(error){
       return next(new HttpError('Error Logging in '+error.message,500))
    }
    
    if(isValid){
      let token;
      try{
         token = jwt.sign({email},'private_token',{expiresIn :'1h'});
      }catch(error){
        return next(new HttpError(`Erorr logging in: ${error.message}`,500))
      }
      
      res.json({token})
    }
    else{
     return next(new HttpError('Invalid Credentials',404))
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
        return next(new HttpError('Error fetching package invenotry '+error.message,500))
    }

    res.json(packages)

}

const updatePackage = async(req,res,next)=>{
   let {update, logData} = req.body
   let response;
   let data= [];
   if(update === null || update === undefined || 
      logData ===null || logData === undefined ||
      logData.apt === null || logData.apt === undefined ||
      logData.packages === null || logData.packages === undefined){
      throw new HttpError("Cannot update with empty data",500)
   }
   const date = new Date()
   let updateLog = [[`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,logData.apt,logData.packages, logData.comment? logData.comment : ""]];

  
   for(let i=0; i<update.length;i++){
      data.push([update[i].apt,parseInt(update[i].packages)])
   }
   

   try{
      response = await logInventory(updateLog);
      response = await updatePackageList(data);
      

  }catch(error){
      return next(new HttpError('Error updating package invenotry '+error.message,500))
  }

   res.json({message:"Updated Completed!",code:200})
}



exports.listPackage = listPackage;
exports.login = login;
exports.updatePackage = updatePackage;