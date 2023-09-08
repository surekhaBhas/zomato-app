import React from 'react'
import Header from '../Header/header'
import { useParams } from 'react-router-dom'
import { CityContext } from '../context/cityContext'
import { useContext ,useState,useEffect} from 'react'
import Filter from './filter/filter';
import axios from 'axios';
import DisplayRestaurant from './displayRestaurants/displayRestaurant'
import './secondPage.css'

function SecondPage() {
    const {cityId}=useContext(CityContext)
    const params=useParams()
    const mealId=params.mealId
    const [responseData, setResponseData] = useState([]);
    const [loading,setLoading]=useState(true);
    const mealTypeArray=["Breakfast","Lunch","Dinner","Snacks","Drinks","NightLife"]
    const stateArray=["Delhi","Mumbai","Pune","Bangalore","Chandigarh"]
    const mealType=mealTypeArray[mealId-1];
    const stateName=stateArray[cityId-1]
    
    useEffect(()=>{
      axios.get(`https://restaurantdatafetch.onrender.com/filter/${mealId}?itemsPerPage=2`)
      .then(res=>{setResponseData(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      setLoading(false);
      })
    },[])
 
    
    
  const onResponseDataReceived = (data) => {
    setResponseData(data);
  };
  
  return (
    <div>
        <Header/>
        <h2 style={{color:'#192F60',marginTop:"10px"}}>{mealType} places in {stateName}</h2>
        <div className='filter-display'>
          <div className='filter'> <Filter cityId={cityId} mealId={mealId} onResponseDataReceived={onResponseDataReceived}/></div>
          {!loading &&<div className='display'> <DisplayRestaurant responseData={responseData}/> </div>}
          
        {loading && <div style={{color:'#192F60',height:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}><h1>Loading...</h1></div>}
      
        </div>
       
          
         
    </div>
  )
}

export default SecondPage
