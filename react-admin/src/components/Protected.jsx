import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Protected = ({ children }) => {
    // const {component} = props;
    const navigate = useNavigate();
  
    useEffect(()=>{
      let login = localStorage.getItem("token");
      if(!login){
          navigate('/login')
      }
    })
    
    
      return (
  
          <>
         {children}
          </>
     
    )
  }
  
export default Protected;
