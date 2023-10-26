import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../../utils/hooks/http-hooks';
import { useForm } from '../../utils/hooks/form-hooks';
import AuthContext from '../../context/auth/auth-context';
import Modal from '../../shared/components/Modal/Modal';
import plus from '../../assets/img/plus.svg';
import bell from '../../assets/img/bell.svg';
import Card from '../../shared/components/Card/Card'
import './PackageManagement.css';

const PackageManagment =()=>{
    const {isLoading, error, sendRequest, clearError}=useHttpClient();
    const [formState,inputHandler,setFormData] = useForm({});


    const [showAddEntry,setShowAddEntry] = useState(false);
    const [showNotify,setShowNotify] = useState(false);
    const [editPkg,setEditPkg] = useState(0)
    const [focusApt,setFocusApt]= useState()

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
                    throw(new Error('Error fetching package data.'));
                }
                
               
                setPackages(response);
                
                setFormData(response)
                
               }catch(error){
            }
    }
    const handleUpdate =async()=>{
        let payload = JSON.parse(JSON.stringify(packages))
        payload[focusApt].packages = editPkg;

        try{
            // must add a measure where if there was an error the values arent changed.
            const response = await  sendRequest('http://localhost:5000/api/packages/update',
            'PATCH',
            JSON.stringify({
                update:payload
            }),
            {'Content-Type':'application/json'}
            );

            setPackages([...payload]);



           }catch(error){

           }
        
    }

    useEffect(()=>{
        pullPackageData();
       
    },[sendRequest])
    
    let dashboard =(
        <div className="container">
        <span className="title">
            <span >Package list</span>
            
            <button className="DBBtn  hover:bg-green-500" onClick={()=>setShowAddEntry(true)}><img  src={plus} alt="add package entry"/></button>
            {/* <button className="DBBtn  hover:bg-yellow-500" onClick={()=>setShowNotify(true)}><img  src={bell} alt="notify tenants" /></button>        */}
        </span>
        <ul className="dashboard">
            {packages && packages.map((data,index) =>data.packages>0?
            <Card key={index}
             data={data} 
             editPkg={editPkg} 
             idx = {index}
             setFocusApt={setFocusApt} 
             setEditPkg={setEditPkg}
             handleEdit= {handleUpdate}/>
             
             : 
             null)}
        </ul>

    </div>
    )

    let addPackageModal=packages&&(
        <>
        <div>
            <label className="m-2 ">Apartment:</label>
            <select className="m-2 w-20 text-center" onChange={(e)=>{
                let res=packages.filter((item)=> item.apt === e.target.value);
                let {pkg,apt} = res.length > 0 ? {pkg:res[0].packages, apt:res[0].apt} : {pkg:0,apt:""};
                setEditPkg(parseInt(pkg))
                setFocusApt(packages.findIndex((item)=>item.apt === apt))
                }}>
                <option value="-">-</option>
                {packages.map((item,indx)=> <option   value={item.apt} key={indx}>{item.apt}</option>)}
            </select>
        </div>
        <div>        
            <label className="m-2">Package(s):</label>
            <input type="number" min={0} className="m-2 w-20 text-center" value={editPkg} onChange={(e)=> setEditPkg(parseInt(e.target.value))} />
        </div>
        </>
    )
    // let NotifyBody=packages&&(
    //     <div className="flex flex-col ">
    //     <div className="flex flex-wrap justify-center m-1">
    //         { // notify feature
    //         packages.filter(item => item.packages >0).map((item,indx)=> 
    //         <button key={indx} className=" w-10 mx-1 my-0.5  notiBtn" onClick={e=> {e.preventDefault()}}> 
    //             {item.apt}
    //         </button> )}
    //     </div>
    //     <button 
    //     className=" block mt-1 w-full p-1 bg-yellow-500 font-bold font-white"
    //     onClick={e=> {e.preventDefault()}}>
    //         Notify All
    //     </button>
    //     </div>
    // )
    return (<>
        {dashboard}
        {showAddEntry && <Modal inputModal 
        modalTitle="Add Packages" 
        modalBody={addPackageModal} 
        handleModal={setShowAddEntry} 
        handleSubmit ={handleUpdate}
        clearInput={()=>{setEditPkg(0); setFocusApt()}} />}
        {/* {showNotify && <Modal modalTitle="Notify Tenants" modalBody={NotifyBody} handleModal={setShowNotify}/>} */}
        </>
    )
}


export default PackageManagment;