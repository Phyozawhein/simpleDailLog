import React, {useState} from 'react';
import './Card.css';
import Modal from '../Modal/Modal';
// import Increment from '../assets/img/plus.svg'
// import Decrement from '../assets/img/minus.svg'
const Card= ({data, handleSubmit,setEditPkg, editPkg})=>{

    const [display,setDisplay] = useState(false)
    const [displayModal,setDisplayModal] = useState(false)
    // const [packages,setPackages] = useState(data.packages);
    const [comment, setComment] = useState("")

    handleSubmit=()=>{
        // invoke API call to save the data and log the time stamp;
        
        }
    const handleHover =()=>{
        setDisplay(!display)
    }

    let modBody = 
    <>
        <div>
            <label>package(s): </label>
            <input 
            type="number" 
            min={0} 
            className='text-center w-20' 
            value={editPkg} 
            onChange={(event)=> setEditPkg(parseInt(event.target.value))}/>

        </div>
        <div>
            <label>Comments:</label>
            <textarea 
            className="w-full p-1 border border-black" 
            spellCheck 
            rows={4}
            value={comment} 
            onChange={(event)=>setComment(event.target.value)} />
        </div>
    </>
    let comp =  display===false ? 
    <>
          <li className="card" onMouseOver={handleHover} >
            <span className="font-bold text-3xl">
               {data.apt}
            </span>
            <span className="font-bold text-xl">
            {data.packages > 1 ?  data.packages+" pkgs" : data.packages+" pkg" }
            </span>
            </li>
            
    </> : 
    <>
            <li className="card"  onMouseLeave={handleHover}   >
                <span className="font-bold text-xl">{data.packages > 1 ?  data.packages+" pkgs" : data.packages+" pkg" } </span>
               
                <span className="cardButtons">
                    <button className="bg-green-400 border border-black w-16 px-2 rounded-sm hover:bg-green-200"
                    onClick={()=>alert("Picked")}>
                        Picked
                    </button>
                    <button className="bg-sky-400 border border-black w-16 px-2 rounded-sm hover:bg-sky-200" 
                    onClick={()=>{setDisplayModal(true); setEditPkg(parseInt(data.packages));}}>
                        Edit
                    </button>
                
                </span>
            </li>
           
           
    </>
            return(<>
             {comp}
             {displayModal && <Modal 
             inputModal 
             handleModal={setDisplayModal} 
             modalTitle={data.apt} 
             modalBody={modBody} 
             handleSubmit={handleSubmit}
             clearInput={()=> {setEditPkg(0); setComment("")}}/>}
            </> )
}

export default Card;