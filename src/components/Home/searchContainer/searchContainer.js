import React, { Component } from 'react'
import './searchContainer.css';
import { CityContext } from '../../context/cityContext';
import axios from 'axios';
const locationURL='https://restaurantdatafetch.onrender.com/cities'
const restaurantUrl="https://restaurantdatafetch.onrender.com/restaurant"

export class SearchContainer extends Component {
  static contextType = CityContext; 
  constructor(){
    super()
    this.state={
      cityId:'',
      locationData:[],
      restaurantData:[],
      restaurantName:'',
      focusItem:false
    }
  }
  componentDidMount(){
   axios.get(locationURL)
    .then(res=>this.setState({locationData:res.data}))
  }
 

  changeCityName=async(e)=>{
    const {setCityId}=this.context
     await this.setState({cityId:e.target.value})
     await setCityId(this.state.cityId)
     await axios.get(`${restaurantUrl}?city_id=${this.state.cityId}`)
     .then(res=>this.setState({restaurantData:res.data}))
     
  }

  filterRestaurantData=()=>{
    return this.state.restaurantData.filter(restaurant=>{  
      const rstName=this.state.restaurantName.toLowerCase()
      const name=restaurant.name.toLowerCase()
        return restaurant.city===this.state.cityId && name.includes(rstName)
    })
  }

  searchChangeHandler=async(e)=>{
     this.setState({restaurantName:e.target.value})
   
  }
  valueChangeByFocus=()=>{
    this.setState({focusItem:true})
  }
  valueChangeByBlur=()=>{
    this.setState({focusItem:false})
  }
  render() {
    const {locationData,restaurantName,focusItem}=this.state
    const filteredRestaurantData=this.filterRestaurantData()
    return (
      <div className='searchContainer container-fluid'>
         <header>
        <span className='zomato'> Zomato</span>
        <div>
        <button className='login'>Login</button>
        <button>Create an account</button>
        </div>
      
    </header>
         <span className='logo'>e!</span>
         <h2>Find the best restaurants, cafés, and bars</h2>
         <div className='input-container'>
           <div className='selectContainer'>
            <select
               onChange={this.changeCityName}
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
              onChange={this.searchChangeHandler}
              onFocus={this.valueChangeByFocus}
              onBlur={this.valueChangeByBlur}
              value={restaurantName}
              />
              {focusItem &&<ul className='listData'>
                {filteredRestaurantData.length?filteredRestaurantData.map(restaurant=><li key={restaurant.name} className='restaurant-container'>
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
}

export default SearchContainer
