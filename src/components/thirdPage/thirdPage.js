import React from 'react'
import Header from '../Header/header'
import { useParams} from 'react-router-dom';
import { useEffect ,useState} from 'react';
import axios from '../../Api/axios'
import './thirdPage.css';
import { Link } from 'react-router-dom';

function ThirdPage() {
    const params=useParams()
    const restaurantId=params.restaurantId
    const [data,setData]=useState([])
    const [overView,setOverView]=useState(true)
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
      axios.get(`/details/restaurant/${restaurantId}`)
      .then(res=>{setData(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      setLoading(false);}
      )
    },[])
  
   const toggleController=()=>{
      setOverView(!overView)
    }

  return (
    <div>
        <Header/>
        {!loading && <div className='details-container'>
          
      
           {data.length?<div className='restaurant-container'>
             <div className='fig-container'>
           <img src={data[0].thumb} alt={data[0].name}/>
              <h2>{data[0].name}</h2>
           </div>
           <div className='tabs-container'>
             <div>
             <button onClick={toggleController} className={overView?'active tabs':'inActive tabs'}>Overview</button>
             <button onClick={toggleController} className={!overView?'active tabs':'inActive tabs'}>Contact</button>
             </div>
              <Link to={`/menus/${restaurantId}?restaurantName=${data[0].name}`}><button className='placeOrder' >Place Online Order</button></Link>
           </div>
           <div>
             {overView &&(<div>
                  <h3 className='sub-heading'>About this place</h3>
                  <div>
                   <h4 className='side-heading'>Cuisine</h4>
                   <p className='values'>{data[0].Cuisine[0].name}, {data[0].Cuisine[1].name}</p>
                  </div>
                  <div>
                   <h4 className='side-heading'>Average Cost</h4>
                   <p className='values'>{data[0].cost} for each people (approx)</p>
                  </div>
               </div>)}
               {!overView && <div>
                  <div className='contact-container'>
                   <p className='phone-number'>Phone Number</p>
                   <p className='phoneNumber-value'>{data[0].contact_number}</p>
                  </div>
                  <div className='contact-container'>
                   <h3 className='addressName'>{data[0].name}</h3>
                   <p className='address'>{data[0].address}</p>
                  </div>
                 </div>}
           </div></div>:<div>No restaurant</div>
          }
        </div>}
         
         {loading && <div style={{color:'#192F60',height:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}><h1>Loading...</h1></div>}
    </div>
  )
}

export default ThirdPage
