import React, {useState} from 'react';
import Card from '../../shared/components/card/Card'
import Input from '../../shared/form-components/input/Input';
import {useForm} from '../../utils/hooks/form-hooks';
const Auth =()=>{
    const [formState,  inputHandler, setFormData] = useForm({
        email:'',
        password:''
    });

    const authSubmitHandler=()=>{

    }

     return(
        <div>
            <Card >
                <h2>Login</h2>
                <form onSubmit={authSubmitHandler}>
                    <Input 
                    type="text" 
                    id="email" 
                    placeholder="email" 
                    value={formState.inputs.email} 
                    inputHandler={inputHandler}/>

                    <Input 
                    type="password"  
                    id="password"
                    placeholder="password" 
                    value={formState.inputs.password} 
                    inputHandler={inputHandler}/>
                    <button type="submit" >Submit</button>
                </form>
            </Card>
        </div>
    )
}

export default Auth;