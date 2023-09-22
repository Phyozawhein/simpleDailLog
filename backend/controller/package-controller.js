
const googleSheetService = require('../apis/googleSheetService');

const {getInventory}= googleSheetService;



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