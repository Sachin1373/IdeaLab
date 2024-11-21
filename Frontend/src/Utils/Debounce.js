import React, { useRef, useState } from "react"
const Debounce = (value,delay) =>{
    const idref = useRef(null);
    const [debouncedvalue,setdebouncedvalue] = useState('')
    
    useEffect(() => {

        if(idref.current){
            clearTimeout(id)
        }
    
     const id =   setTimeout(()=>{
            setdebouncedvalue(value)
        },1000)
    
      return () => {
        clearTimeout(idref.current)
      }
    }, [value])
    return debouncedvalue;
    
}

export default Debounce