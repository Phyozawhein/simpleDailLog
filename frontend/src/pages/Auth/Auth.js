import React, {useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '../../shared/components/card/Card'
import Input from '../../shared/form-components/input/Input';
import {useForm} from '../../utils/hooks/form-hooks';
import { useHttpClient } from '../../utils/hooks/http-hooks';
import authContext from '../../context/auth/auth-context';

import './Auth.css';
const Auth =()=>{
    const [formState,  inputHandler, setFormData] = useForm({
        email:'',
        password:''
    });
    const auth = useContext(authContext)
    const {isLoading, error, sendRequest, clearError}=useHttpClient();
    const navigate = useNavigate();
    const authSubmitHandler = async (event)=>{
        event.preventDefault();
        try{
                const response = await  sendRequest('http://localhost:5000/api/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.trim(),
                    password: formState.inputs.password.trim()
                }),
                {'Content-Type':'application/json'}
                );
               
                if(!response.token){
                    throw(new Error(response.message));
                }
                auth.login(response.token)
                navigate('/')
               }catch(error){
                
            }
    }

        return(
            <div>
                
                <Card >
                    <h2 className="authTitle">Welcome to 123 South Front Desk</h2>
                    {error&&error  // replace it with error modal 
                    } 
                    <form onSubmit={authSubmitHandler} className="authForm">

                        <Input 
                        type="text" 
                        id="email" 
                        placeholder="email" 
                        value={formState.inputs.email} 
                        inputHandler={inputHandler}
                        required/>

                        <Input 
                        type="password"  
                        id="password"
                        placeholder="password" 
                        value={formState.inputs.password} 
                        inputHandler={inputHandler}
                        required
                       />
                        <Input type="submit" value="Login"/>
                    </form>
                </Card>
            </div>
        )
    
}
export default Auth;