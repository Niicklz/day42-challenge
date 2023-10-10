import { useState } from "react"


export const REQUEST_STATUS = {
    SUCCESS: "success",
    ERROR: "error",
    LOADING: "loading",
    IDLE: "idle",
  };

export const useFetch = ({url = "", defaultVal }) => {
    const [info, setInfo] = useState(defaultVal)
    const [status, setStatus] = useState("idle")
    
    const getData = async(newUrl)=> {
        
        try{
            setStatus(REQUEST_STATUS.LOADING)
            const response = await fetch(url || newUrl)
            const {results} = await response.json()
                        
            
            setInfo(results)
            setStatus(REQUEST_STATUS.SUCCESS)
            console.log(results);
            
            

        }catch{
            setStatus(REQUEST_STATUS.ERROR)
        }
       
    }
  

    return {
        info,
        status,       
        getData,
       }
}