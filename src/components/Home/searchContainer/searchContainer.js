import axios from '../../../Api/axios'
import './searchContainer.css';
import { CityContext } from '../../context/cityContext';
import {useState,useEffect,useContext} from 'react'
import { useNavigate,useLocation,Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useLogout from '../../../hooks/useLogout';
const locationURL='/cities'
const restaurantUrl="/restaurant";

function SearchContainer() {
  const logout=useLogout()
  const {auth}=useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [cityId,setCity_Id]=useState('');
  const [locationData,setLocationData]=useState([]);
  const [restaurantData,setRestaurantData]=useState([]);
  const [focusItem,setFocusItem]=useState(false);
  const [rstName,setRstName]=useState('')

  const {setCityId}=useContext(CityContext)

  useEffect(() => {
     axios.get(locationURL)
      .then((res) => {
     setLocationData(res.data)
      })
      .catch((error) => {
        navigate('/login', { state: { from: location }, replace: true });
         console.log(error)
      });
  }, []);



  const changeCityName=async(e)=>{

    setCity_Id(e.target.value)
    setCityId(e.target.value)
    axios.get(`${restaurantUrl}?city_id=${e.target.value}`)
    .then(res=>{
     setRestaurantData(res.data)  
    })
    .catch((error)=>{
      navigate('/login', { state: { from: location }, replace: true });
        console.log(error)
      }
    )
    
  
 }
 const searchChangeHandler=(e)=>{
  setRstName(e.target.value)

}
const filterRestaurantData=()=>{
  return restaurantData.filter(restaurant=>{  
    const restName=rstName.toLowerCase()
    const name=restaurant.name.toLowerCase()
      return restaurant.city===cityId && name.includes(restName)
  })
}
 const valueChangeByFocus=()=>{
  setFocusItem(true)
}
const valueChangeByBlur=()=>{
  setFocusItem(false)
}
const signOut=async()=>{
  await logout()
  navigate('/login')
}
const filteredData=filterRestaurantData()
  return (

    <div className='searchContainer container-fluid'>
         <header>
        <span className='zomato'> Zomato</span>
        <div>
        {auth.username?'':<Link to='/login'><button className='login'>Login</button></Link>}
        {auth.username?<button onClick={signOut}>Logout</button>:<Link to='/register'><button>Create an account</button></Link>}
        </div>
      
    </header>
         <span className='logo'>e!</span>
         <h2>Find the best restaurants, cafés, and bars</h2>
         <div className='input-container'>
           <div className='selectContainer'>
            <select
               onChange={changeCityName}
                >
                  <option>Please type a location</option>
            {locationData.length?
            (locationData.map(location=>
              <option key={location._id} value= {location.city_id}>
              {location.city_name}
            </option>)):<option>No Location Found</option>}
           
           </select>
           </div> 
            <div className='searchInput'>
              <input type='text' 
              placeholder="&#x1F50D;  Search for restaurants" 
              onChange={searchChangeHandler}
              onFocus={valueChangeByFocus}
              onBlur={valueChangeByBlur}
              value={rstName}
              />
              {focusItem &&<ul className='listData'>
                {filteredData.length?filteredData.map(restaurant=><li key={restaurant.name} className='restaurant-container'>
                  <img src={restaurant.thumb} alt={restaurant.name} />
                  <div>
                    <h5>{restaurant.name}</h5>
                    <p>{restaurant.locality}</p>
                  </div>
                </li>
          
                ):<li>Restaurant Not Found</li> }
                </ul>}
              </div>
         </div>
      </div>
  )
}

export default SearchContainer
    


 

 