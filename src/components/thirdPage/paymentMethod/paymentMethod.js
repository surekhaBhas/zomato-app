import  { useState } from 'react'
import './paymentMethod.css';
import {AiOutlineClose,AiFillWallet} from 'react-icons/ai'
import {BiSolidCreditCardAlt} from 'react-icons/bi'
import {BsCreditCard2FrontFill} from 'react-icons/bs';
import {HiCreditCard} from 'react-icons/hi';
import {RiBankCardFill} from 'react-icons/ri'

import { Link,useLocation } from 'react-router-dom';

function PaymentMethod() {
  const location=useLocation();
  
  const [selectedMethod,setSelectMethod]=useState("Credit/Debit Cards")
  const searchParams = new URLSearchParams(location.search);
  let cost=searchParams.get('cost')
  const paymentMethods = [
    { icon: <RiBankCardFill/>, label: 'Credit/Debit Cards' },
    { icon: <AiFillWallet/>, label: 'Wallets' },
    { icon: <BiSolidCreditCardAlt/>, label: 'UPI' },
    { icon: <BsCreditCard2FrontFill/>, label: 'Credit' },
    { icon: <RiBankCardFill/>, label: 'Net Banking' },
    { icon: <HiCreditCard />, label: 'Food Cards' }
  ];
  const  handleButtonClick = (method) => {
    setSelectMethod(method);
  };
  return (
    <div className='bg-container'>
      <div className='payment-container'>
        <button className='close'><AiOutlineClose/></button>
        <h2 className='title'>Choose payment method</h2>
        <div className='payment-card'>
            <ul className='method-container'>
                {paymentMethods.map((method,index)=><li key={index} className={ selectedMethod === method.label ? 'selected' : ''}><button  className='button'
                  onClick={() => handleButtonClick(method.label)}>{method.icon}{method.label}</button></li>)}
            </ul>
            <div className='card-details'>
              <p className='add'>Add new card</p>
             <div className='accept'> <p >WE ACCEPT </p><div className='card-box'>
                <img src='images/visa-mastercard.jpg' alt='master-card' width="70px" height="15px"/>
                <img src='images/zeta.jpg' alt='zeta' height='15px' width='30px'/>
              </div> 
              </div>
              <form>
                <div className='detailsOfCard'>
                  <input className='input' type='text' name='cardNumber'placeholder='Card number'/>
                  <div className='valid'>
                    <input className='month' type='text' name='MM/YY' placeholder='valid through(MM/YY)'/>
                    <input className='cvv' type='text' name='cvv' placeholder='CVV'/>
                  </div>
                  <input className='input' type='text' name='cardName' placeholder='Name of card'/>
                </div>
                <div className='conditions'><input type='checkbox' id='conditions'/>
                <label  htmlFor='conditions'>
                  Securely save this card for a faster checkout next time.
                  </label></div>
                <Link to='/'>  <button className='pay'>PAY {cost}</button></Link>
              </form>
              <p className='description'>card details will be saved securely. based of the industry standard</p>
            </div>
        </div> 
      </div>
      </div>
  )
}

export default PaymentMethod

 
 