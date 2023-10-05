import React ,{useState, useRef, useCallback, useEffect} from 'react';

export const useHttpClient=()=>{
    const [isLoading ,setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method='GET',body=null, headers={})=>{
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
         
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            
            const  resData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl=> reqCtrl!==httpAbortCtrl);
            
            if (!response.ok){
                throw new Error(resData.message);
            }
           setIsLoading(false);
           return resData;

        }catch(err){
           
            if(err.name !== 'AbortError'){
                setError(err.message);
                throw err;
            }
            setIsLoading(false);
           
          
        }
     
    },[]);

    const clearError = ()=> setError(null)

    useEffect(()=>{
        return()=>{
            activeHttpRequests.current.forEach(abortCtrl=> abortCtrl.abort());
        };
    },[])

    return {isLoading, error, sendRequest, clearError}
}