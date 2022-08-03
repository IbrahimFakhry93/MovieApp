import React from 'react'
import Axios from 'axios';  // Don't put Axios inside curly braces because it is default exported
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import styles from './Register.module.css'

export default function Register(props) {
  const[loading,setLoading]=useState(false);
  const [errorList,setErrorList]=useState([]);
  const[error,setError]=useState('');
  const[user,setUser]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"", 
    age:""
  });

  let navigate=useNavigate();

  function getUser(e){
    let myUser={...user}
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }

  async function submitForm(e){
    e.preventDefault();  // to prevent default page refresh by form tag
    setLoading(true);
    let x = validateForm();
    console.log(x);
    if(x.error){
      setLoading(true);
        setErrorList(x.error.details);  
    }
    else{
      setLoading(true);
    let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user);
    let response = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user);
    console.log(response);
    if(data.message ==='success'){
      console.log(data.message);
      setError('');
      // navigate to login page
      navigate('/login');
    }
   else{
     setError(data.message);
   }
  }
  }

 function validateForm(){
  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    age: Joi.number().min(18).max(80).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
return schema.validate(user,{abortEarly:false});
}

  return (
   <>
       {loading?<div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1"></i>
        </div>:<div className="layer d-none position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1"></i>
        </div>}
      <div className="w-75 mx-auto py-5">
    
        <h2 className='mb-3'>Registration Form</h2>
        {/* to edit password message text to hide the password pattern showed in Joi default alert password message  */}
        {errorList.map((obj,i)=>obj.message.includes("password")?<div key={i}  className="alert alert-danger">Password Invalid</div>:<div key={i} className="alert alert-danger">{obj.message}</div>)}
        {/* {errorList?<div className="alert alert-danger">{erro}</div>:setErrorList('')} */}
        {error.length>0?<div className="alert alert-danger">{error}</div>:<div className="alert alert-danger d-none">{error}</div>}
      
        <form onSubmit={submitForm}>
          <label htmlFor="first_name">First Name:</label>
          <input onChange={getUser} className='form-control mt-2 mb-3' type="text" name='first_name' />

          <label htmlFor="Last_name">Last Name:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="text" name='last_name' />
          
          <label htmlFor="age">Age:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="number" name='age' />

          <label htmlFor="email">Email:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="email" name='email' />

          <label htmlFor="password">Password:</label>
          <input onChange={getUser} className='form-control mt-2  mb-3' type="password" name='password' />
          {/* button to function as a submit button must be inside the form scope and last element inside the form and contains type="submit" */}
          <button type="submit" className='btn btn-outline-info mt-2'>Register</button>
        </form>
      </div>
   </>
  )
}
