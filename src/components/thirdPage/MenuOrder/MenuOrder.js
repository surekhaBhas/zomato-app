import {useEffect, useState} from 'react'
import './MenuOrder.css'
import {useLocation,useParams,Link,useNavigate} from "react-router-dom"
import {AiOutlineClose} from 'react-icons/ai'
import axios from '../../../Api/axios';


function MenuOrder() {
  const navigate=useNavigate()
  const params=useParams();
  const location=useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId=params.restaurantId;
  const restaurantName = searchParams.get('restaurantName')
  const [menuData,setMenuData]=useState([])
  const [quantities, setQuantities] = useState([]);
  const [isAddedStates, setIsAddedStates] = useState([]);
  const [menuId,setMenuId]=useState([])
  const [total,setTotal]=useState(0)
 
 useEffect(()=>{
  const getMenu=async()=>{
    try{
      const res=await axios.get(`/menu/${restaurantId}`)
      setMenuData(res.data)
      setQuantities(res.data.map(()=>0))
      setIsAddedStates(res.data.map(()=>false))
    }catch(err){
      console.log(err)
    }
  }
  getMenu()
  setTotal(0)
 },[])

const updateIsAdded=(index, newValue)=>{
    setIsAddedStates(prevStates=>{
      const newValues=[...prevStates]
      newValues[index]=newValue
      return newValues
    })
}
 
const incrementQuantity = (index, newQuantity) => {
  if(isAddedStates[index]){
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  }
 
};

const decrementQuantity = (index, newQuantity) => {
  if(isAddedStates[index] && newQuantity>=0){
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    }) 
    
  }
 
};
const addItemToMenu=(id,price)=>{
  setMenuId(prevMenuId=>[...prevMenuId,id])
  setTotal(prevTotal=>(prevTotal+parseInt(price)))

}
const removeItemFromMenu = (id, price) => {
  let newMenuId = [...menuId];
  const index = newMenuId.indexOf(id); 

  if (index !== -1) {
    newMenuId.splice(index, 1); 
    setMenuId(newMenuId); 
    setTotal(prevTotal => prevTotal - price); 
  }
};
const onResetHandler=()=>{
  setQuantities(quantities.map(()=>0))
  setIsAddedStates(isAddedStates.map(()=>false))
  setTotal(0)
  navigate(-1)
} 

  return (
    <div className='bg-container'>
        <div className='menu-container'>
          
          <button className='close' onClick={onResetHandler}><AiOutlineClose/></button>
          <h1>{restaurantName}</h1>
          <ul className='menuList'>
          {
            menuData.map((item,index)=>{
              return <li key={item.menu_id}>
              <div className='menu-details'>
                <div className='logoCreation'><div className='dot'></div></div>
                <h3>{item.menu_name}</h3>
                <h3>Price: {item.menu_price}</h3>
                <p>{item.description}</p>
              </div>
              <div className='menu-image'>
                <img src={item.menu_image} alt={item.menu_name}/>
                <div className='adding'><button onClick={()=>{ updateIsAdded(index, true);incrementQuantity(index, quantities[index] + 1);addItemToMenu(item.menu_id,item.menu_price)}}>{isAddedStates[index]?'+':''}</button>
                <button onClick={()=>{ updateIsAdded(index, true)}}>{isAddedStates[index]?quantities[index]:'Add'}
                </button><button onClick={()=>{ updateIsAdded(index, true);decrementQuantity(index, quantities[index] - 1);removeItemFromMenu(item.menu_id,item.menu_price)}}>{isAddedStates[index]?'-':''}</button></div>
              </div>
            </li>
            })
           }
           
          </ul>
          <div className='bill'>
            <h2>Subtotal</h2>
            <h2>{total}</h2>
            <Link to={`/orderForm?totalPrice=${total}&restaurantName=${restaurantName}&menuId=${menuId}`} className='pay'><button >Proceed</button></Link>
           </div>
        </div>
        </div>
      
  )
}

export default MenuOrder
