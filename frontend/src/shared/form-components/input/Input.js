import React,{useEffect, useState} from 'react';
import './Input.css';


const Input =(props)=>{
    const {id,value, inputHandler}= props;

    const changeHandler = (event =>{        
        inputHandler(id,event.target.value);
    })
    return (
        <input 
        type={props.type}
        value={value}
        placeholder={props.placeholder}
        onChange={changeHandler}
         />
    )
}

export default Input;