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
                
                setPackages(response);
               }catch(error){
                console.log('Error fetching data: '+error.message);
            }
    }

    useEffect(()=>{
        pullPackageData();
    },[])
    return <div>
        <h2>Package Managment</h2>
        {/* <ul>
            {packages.map((item,index)=><li>{item.apt} : {item.packages}</li>)}
        </ul> */}
    </div>
}

export default PackageManagment;