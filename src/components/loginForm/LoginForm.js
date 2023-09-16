import {useRef,useState,useEffect}from 'react'
import useAuth from '../../hooks/useAuth';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import './LoginForm.css'

import axios from '../../Api/axios';
const LOGIN_URL='/login'

function LogInForm() {
 const {setAuth,persist,setPersist}=useAuth();
 const navigate=useNavigate();
 const location=useLocation();
 const from =location.state?.from?.pathname || "/"

 const userRef=useRef();
 const errRef=useRef()

 const [username,setUsername]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('')
 const [errMsg,setErrMsg]=useState('');

 useEffect(()=>{
  userRef.current.focus()
 },[])

 const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const response=await axios.post(LOGIN_URL,
      JSON.stringify({username,password,email}),
      {
        headers:{"Content-Type":"application/json"},
        withCredentials:true
      }
      )
      
      const accessToken=response?.data?.accessToken;
      const roles=response?.data?.roles;
      setAuth({username,password,email,roles,accessToken})
      setUsername('');
      setPassword('');
      setEmail('')
      setErrMsg('')
      navigate(from,{replace:true})


  }catch(err){
    if(!err?.response){
        setErrMsg('No Server Response')
    }else if(err.response?.status===400){
      setErrMsg('Missing Username or Password or Email')
    } else if(err.response?.status===401){
      setErrMsg('Unauthorized');
    }else{
      setErrMsg('Login Failed')
    }
    errRef.current.focus();
  }
 }
 const togglePersist = () => {
  setPersist(prev => !prev);
}


useEffect(()=>{
  localStorage.setItem("persist",persist);
},[persist])
  return (
    <div className='bg-container'>
      <div className='registerForm'>
        
      <form onSubmit={handleSubmit}>
        <p className='errMsg' ref={errRef}>{errMsg}</p>
        <div className='input-box'>
            <label>Name:</label>
        <input type='text' 
        required 
        ref={userRef}
        placeholder='Enter Your Name'
        autoComplete='off'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        </div>
        <div className='input-box'>
            <label>Email:</label>
        <input type='email'
         required
          placeholder='Enter Your email'
          autoComplete='off'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className='input-box'>
            <label>Password:</label>
        <input type='password'
         required 
         placeholder='Enter Your password'
         autoComplete='off'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
         />
        </div>
        <button  className='submit'>LogIn</button>
      </form>
     <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
      <p className='link-para'><em>Don't have account?</em> <span className='link'><Link to='/register'>Sign up</Link></span> </p>
      </div>
    </div>
  )
}

export default LogInForm
