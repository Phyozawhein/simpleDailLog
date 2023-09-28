import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../utils/hooks/http-hooks';


const PackageManagment =()=>{

    const {isLoading, error, sendRequest, clearError}=useHttpClient();
    const [packages,setPackages]=useState(null);
    const pullPackageData = async ()=>{
        
        try{
                const response = await  sendRequest('http://localhost:5000/api/packages',
                'GET',
                null,
                {'Content-Type':'application/json'}
                );
                if(!response){
                    throw(new Error('Error fetching package data'));
                }
                console.log(response)
                setPackages(response);
               }catch(error){
                console.log('Error logging in: '+error.message);
            }
    }

    useEffect(()=>{
        pullPackageData()
    },[])
    return <div>
        <h2>Package Managment</h2>
    </div>
}

export default PackageManagment;