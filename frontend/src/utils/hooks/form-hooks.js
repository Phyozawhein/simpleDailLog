import {useCallback, useReducer} from 'react';

const formReducer =(state,action)=>{
    
    switch(action.type){
        case 'INPUT_CHANGE': 
        return {
            ...state, 
            inputs:{ 
                ...state.inputs, 
                [action.inputId]: action.value
        } };
        case 'INIT_RES_DATA': return{ 
            ...state, residents: action.data
        };
        case 'SET_PKG_DATA': return{
            ...state,
            packages: action.data
        };
        case 'CLEAR_INPUT': return{
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId]:undefined
            }
        }
        default : return state;
    }
}

export const useForm=(initialInputs)=>{
    const [formState,dispatch] = useReducer(formReducer,{
        inputs: initialInputs
    });

    const inputHandler= useCallback((id,value)=>{
        dispatch({
            type:'INPUT_CHANGE',
            value: value,
            inputId: id
    });
    },[])
    const setPkgData = useCallback((inputData)=>{
        dispatch({
            type:'SET_PKG_DATA',
            data: inputData
        });
    },[])
    const initResData = useCallback((inputData)=>{
        dispatch({
            type:'INIT_RES_DATA',
            data: inputData
        });
    })
    const clearInput= useCallback((id)=>{
        dispatch({
            type:"CLEAR_INPUT",
            inputId:id
        })
    })

    return [formState,inputHandler,setPkgData, initResData,clearInput]
};