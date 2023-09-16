import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import './DetailsForm.css';
import { useLocation,useNavigate} from 'react-router-dom';
import {useState,useContext} from 'react';
import UseAxiosPrivate from '../../../hooks/useAxiosPrivate'
import AuthContext from '../../context/AuthContext';
 
function  DetailsForm(){
  const navigate=useNavigate()
  const {auth}=useContext(AuthContext)
  const axiosPrivate=UseAxiosPrivate()
  const location=useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantName = searchParams.get('restaurantName')
  const cost=searchParams.get('totalPrice')
  const menuId=searchParams.get('menuId');
  const totalPrice=searchParams.get('totalPrice')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')


  const onSubmitHandler=async(e)=>{
    e.preventDefault()
 
    let orderId;
    try {
      const response = await axiosPrivate.post('/orders', {
        "username": auth.username,
        "email": auth.email,
        phone,
        restaurantName,
        "menuItem":menuId.split(","),
        "cost": totalPrice,
        address,
      });
      console.log(response.data)
      orderId=response.data.order_id
    } catch (err) {
      console.error(err);
    }
   
    navigate(`/orderDisplay/${orderId}?restaurantName=${restaurantName}&cost=${cost}`)
  }
  const resetHandler=()=>{
      navigate(-1)
  }
  
    return (
      <div className='bg-container'>
        <div className='detailsForm-container'>
        <button className='close' onClick={resetHandler}><AiOutlineClose/></button>
        <h2 className='title'>{restaurantName}</h2>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className='detailsForm-label'>Name</label>
            <input
             type='text'
             className='detailsForm-input'
             name='username'
             value={auth.username}
             readOnly
             placeholder='Enter your name'
             required
                />
          </div>
          <div>
            <label className='detailsForm-label'>Mobile Number</label>
            <input type='text' 
            required
            onChange={(e)=>setPhone(e.target.value)}
            className='detailsForm-input' name='phoneNumber' placeholder='Enter mobile number'/>
          </div>
          <div>
            <label className='detailsForm-label'>Email</label>
            <input type='email'
             className='detailsForm-input'
             name='email' placeholder='Enter your email'
             readOnly
            required
             value={auth.email}/>
          </div>
           <div className='detailsForm-label'>
            <label>Address</label>
            <textarea rows='5' className='detailsForm-input' 
            onChange={(e)=>setAddress(e.target.value)}
            required
            placeholder='Enter your address'></textarea>
           </div>
           <button className='proceed' type='submit'>Proceed</button>
        </form>
      </div>
      </div>
    )
  
}

export default DetailsForm
