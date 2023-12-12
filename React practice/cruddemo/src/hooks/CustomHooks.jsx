import React, { useState }  from "react";
const CutomHooks=(intval,initerror)=>{
    const[inp,setinp]=useState()
    console.log(inp);
    const handleChange=(e)=>{
        setinp((inp)=>({...inp,[e.target.name]:e.target.value}))
        console.log("called handleChange from custom hook",inp);   
    }
    const updatedData = (data) => {
        console.log("api response in hook ",data);
        setinp(data)
    }
    return{handleChange,inp,updatedData}
}
export default  CutomHooks