import React from 'react'
import "./RegisterForm.css"
import {Link,useNavigate} from 'react-router-dom';
import axios from '../../Api/axios';
import {useRef,useState,useEffect} from 'react';

const REGISTER_URL = '/register';

function RegisterForm() {
    const userRef=useRef();
    const errRef=useRef()
    const Navigate=useNavigate()

    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')

    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false)


useEffect(()=>{
    userRef.current.focus()
},[])

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
       const response=await axios.post(REGISTER_URL,
        JSON.stringify({username,email,password}),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
            
        }
        )
        console.log(JSON.stringify(response?.data))
        setUsername('');
        setPassword('');
        setEmail('');
        setSuccess(true)
        setErrMsg('');
        Navigate('/login')
    }catch(err){
        console.log(err)
        if(!err?.response){
            setErrMsg('No Server Response')
        } else if (err.response?.status===409){
            setErrMsg('Username Taken')
        } else {
            setErrMsg('Registration Fails')
        }
        errRef.current.focus()
        setSuccess(false)
    }
}

  return (
    <div className='bg-container'>
      <div className='registerForm'>
        
      <form onSubmit={handleSubmit}> 
      {success && <p style={{color:'green',textAlign:'center'}}>Success!</p>}
        <p className='errMsg' ref={errRef}>{errMsg}</p>
        <div className='input-box'>
            <label>Name:</label>
        <input type='text' 
        required
        name="username" autoComplete="off"
        ref={userRef} 
       
        value={username}
        placeholder='Enter Your Name' 
        onChange={(e)=>setUsername(e.target.value)}
        />
        </div>
        <div className='input-box'>
            <label>Email:</label>
        <input type='email' 
         value={email}
        required placeholder='Enter Your email' 
        onChange={(e)=>setEmail(e.target.value)}
        autoComplete="username"
        />
        </div>
        <div className='input-box'>
            <label>Password:</label>
        <input type='password'
         required 
         value={password}
         placeholder='Enter Your password' 
         onChange={(e)=>setPassword(e.target.value)}
         autoComplete="off"
         />
        </div>
        <button  className='submit'>Sign Up</button>
      </form>
      <p className='link-para'><em>Already have an account ?</em> <span className='link'><Link to='/login'>Login</Link></span> </p>
      </div>
    </div>
  )
}

export default RegisterForm
