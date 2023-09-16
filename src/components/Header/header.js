import React from 'react'
import './header.css'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout';

function Header() {
  const {auth}=useContext(AuthContext)
  const logout=useLogout()
  const Navigate=useNavigate()

  const signOut=async()=>{
        await logout();
        Navigate('/login')
  }
  return (
    <header className='nav'>
      <span className='logo'>e!</span>
      <nav>
      <Link to='/'><button className='account login'>Home</button></Link>
      <div>
      <button className='account login'>{auth.username?`Hi ${auth.username}`:<Link to='/login'>Login</Link>}</button>
      {auth.username?<button className='account' onClick={signOut}>Logout</button>:<Link><button className='account'>Create an account</button></Link>}
     
      </div>
      </nav>
    </header>
  )
}

export default Header
