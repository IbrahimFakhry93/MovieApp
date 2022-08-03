import React from 'react'
import styles from './Login.module.css'
import Axios from 'axios';  // Don't put Axios inside curly braces because it is default exported
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'


export default function Login(props) {
  const[loading,setLoading]=useState(false);
  const [errorList,setErrorList]=useState([]);
  const[error,setError]=useState('');
  const[user,setUser]=useState({
    email:"",
    password:"", 
  });
  
  let navigate=useNavigate();
  function getUser(e){
    let myUser={...user}
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }

  async function submitForm(e){
    e.preventDefault();
    setLoading(true);
    let x = validateForm();
    if(x.error){
      setLoading(false);
        setErrorList(x.error.details);
    }
    else{
    let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin',user);
    setLoading(false);
    if(data.message ==='success'){
      console.log(data);
      console.log(data.message);
      localStorage.setItem("User Token",data.token);
      props.decodeToken();
      setError('');
      // navigate to home
      navigate('/home');
    }
   else{
    setLoading(false);
     setError(data.message);
   }
  }
  }

 function validateForm(){
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
return schema.validate(user,{abortEarly:false});
}

  return (
   <>
      <div className="w-75 mx-auto py-5">
        
        {loading?<div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1"></i>
        </div>:<div className="layer d-none position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1"></i>
        </div>}
        <h2 className='mb-3'>Sign In</h2>
        {errorList?errorList.map((obj,i)=><div key={i} className="alert alert-danger">{obj.message}</div>): setErrorList([])}
        {/* {errorList?<div className="alert alert-danger">{erro}</div>:setErrorList('')} */}
        {error.length>0?<div className="alert alert-danger">{error}</div>:<div className="alert alert-danger d-none">{error}</div>}
      
        <form onSubmit={submitForm}>

          <label htmlFor="email">Email:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="email" name='email' />

          <label htmlFor="password">Password:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="password" name='password' />

          <button type="submit" className='btn btn-outline-info mt-2'>Login</button>
        </form>
      </div>
   </>
  )
}
