import React from 'react';
import './Input.css';


const Input =(props)=>{
    const {id,value, type, inputHandler ,placeholder, className="" , required=false}= props;

    const changeHandler = (event =>{        
        inputHandler(id,event.target.value);
    })
    if(type==='submit'){
        return(<input 
        className="input-submit"
        type={type}
        value={value}
         />)
    }

    return (
        <input 
        className={`${className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        required ={required}
         />
    )
}

export default Input;