import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className='nav'>
      <span className='logo'>e!</span>
      <nav>
      <Link to='/'><button className='account login'>Home</button></Link>
      <div>
      <button className='account login'>Login</button>
      <button className='account'>Create an account</button>
      </div>
      </nav>
    </header>
  )
}

export default Header
