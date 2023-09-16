import React from 'react'
import {useEffect,useState} from'react'
import UseAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams ,useLocation,useNavigate} from 'react-router-dom';
import axios from '../../Api/axios'
import {BsFillTrashFill} from 'react-icons/bs';
import './DisplayOrder.css';
import {AiOutlineClose} from 'react-icons/ai'

function DisplayOrder() {
  const location=useLocation();
  const navigate=useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const restaurantName = searchParams.get('restaurantName')
  let cost=searchParams.get('cost')
   const axiosPrivate=UseAxiosPrivate()
   const params=useParams()
   const orderId=params.orderId
   const [menuItems,setMenuItems]=useState()
   const [menuOrderData,setMenuOrderData]=useState([])
   const [inDetailMenu,setInDetailMenu]=useState();
   const [price,setPrice]=useState(searchParams.get('cost'))
   
   useEffect(()=>{
      
      const getOrderDetails=async()=>{
        try{
          const response=await axiosPrivate.get(`/orders/${orderId}`)
          console.log(response.data)
          setMenuItems(response.data.menu_item)
         }catch(err){
          console.log(err)
         }
      }
      getOrderDetails() 
      setPrice(cost)
   },[])  

   useEffect(()=>{
     let count={}
     let menuArr=[]
    if(menuItems){
      for(let item of menuItems){
        if(count[parseInt(item)]){
          count[item]++
        } else {
          count[item]=1
          menuArr.push(parseInt(item))
        }
       } 
    }
    setInDetailMenu(count)
   
     const getMenuDetails=async()=>{
      try{
        const response=await axios.get(`/menuItems?menu_id=${menuArr}`)
        setMenuOrderData(response.data)
        
      }catch(err){
        console.log(err)
      }
     }
     getMenuDetails()
   },[menuItems])

   const deleteOrder=(id,cost)=>{

    const filterMenuId=menuItems.filter(menuId=>parseInt(menuId) !==id)
    const filterOrder=menuOrderData.filter(menuId=>menuId.menu_id !==id)
    setMenuOrderData(filterOrder)
    setMenuItems(filterMenuId) 
    setPrice(prev=>prev-cost*inDetailMenu[id])
   }
   
   const updateOrders=async()=>{
    try{
      const response=await axiosPrivate.put(`orders/${orderId}?cost=${price}&menuId=${menuItems}`)
      console.log(response)
      navigate(`/payment/${orderId}?cost=${price}`)
    }catch(err){
      console.log(err)
    }
   }
  
  return (
    <div className='bg-container'>
      <div className='orders-card'>
        <button className='close'><AiOutlineClose/></button>
      <h1>{restaurantName}</h1>
      <h2>Ordered Items</h2>
         <ul className='ordersContainer'>
          {
            menuOrderData.length?menuOrderData.map(order=>{
              return<li key={order._id} className='order'>
                <h3>{order.menu_name}</h3>
                <div className='layout'>
                <div className='order-image'>
                <img src={order.menu_image} alt={order.menu_name}/>
                </div>
                <div className='order-cost'>
                  <p><span>Cost:</span> {order.menu_price}</p>
                  <p><span>Number of Items:</span> {inDetailMenu[order.menu_id]}</p>
                   <p><span>Total Cost:</span> {order.menu_price*inDetailMenu[order.menu_id]} </p>
                </div>
                <button onClick={()=>{deleteOrder(order.menu_id,order.menu_price)}}><BsFillTrashFill  className='delete'/></button>
                </div>
                
              </li>
            }):<li className='order'>No Orders</li>
          }
         </ul>
         {menuOrderData.length?<div className='bill' style={{marginTop:'auto'}}>
          <h1>Subtotal   </h1> 
          <h1>{price}</h1>
          <button className='pay' onClick={updateOrders}>Proceed to Pay</button>
          </div>:null}
         </div>
    </div>
  )
}
export default DisplayOrder
