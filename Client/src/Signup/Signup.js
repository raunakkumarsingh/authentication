import React from 'react'
import './signup.css'
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router';


function Signup() {

  
 
  const [loader,setLoader]=useState(false);
 
    let history=useNavigate();
      const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:"",role:""});
      
      const onChange=(e)=>{
       setCredentials({...credentials,[e.target.name]:e.target.value})
      }
       console.log(credentials)
      const handleSubmit=async(e)=>{
        setLoader(true);
        e.preventDefault();
        if(credentials.password!=credentials.cpassword){
          alert("Confirm Password & Entered Password should be same")
        }
        else if(credentials.role=="select role"){
          alert("Please select role")
        }
        else{
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,role:credentials.role})

        });

        const json=await response.json();
        
        if(json.success){
          setLoader(false);
          history('/login');
        }
        else{
          alert(json.error[0].msg || json.error)
        }
      }
      }
     
  return (
    <div className="container col-sm-12" id="log" style={{height:"100%"}}>
    <div className={`signupcard d-flex justify-content-center aling-item-center`}>
  <div className="card-body">
  <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name='name' required/>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  name='password' onChange={onChange} id="exampleInputPassword1" required/>
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id="exampleInputPassword2"  onChange={onChange} required/>
  </div>
  <div className="mb-3">
  <label className='mx-2' for="cars">Choose Role:</label>

<select className='mx-2' name="role" id="role" onChange={onChange} required>
  <option value="select role">select role</option>
  <option value="user">user</option>
  <option value="admin">admin</option>
</select>
  </div>
  
 
  <button type="submit" className="btn" >SignUp &nbsp;
  <span className="spinner-border spinner-border-sm my-1" role="status" aria-hidden="true" style={{display:loader?"box":"none"}}></span></button>
</form>
  </div>
</div>
</div>
  )
}

export default Signup