import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../../utils/hooks/http-hooks';
import AuthContext from '../../context/auth/auth-context';

const PackageManagment =()=>{

    const {isLoading, error, sendRequest, clearError}=useHttpClient();
    const [packages,setPackages]=useState(null);
    const auth = useContext(AuthContext);
    const pullPackageData = async ()=>{
        
        try{
                const response = await  sendRequest('http://localhost:5000/api/packages',
                'GET',
                null,
                {
                    authorization: `Bearer ${auth.token}`,
                    'Content-Type':'application/json'}
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
        {packages&&<ul>
            {packages.map((item,index)=><li key={index} >{item.apt} : {item.packages}</li>)}
        </ul>}
    </div>
}

export default PackageManagment;