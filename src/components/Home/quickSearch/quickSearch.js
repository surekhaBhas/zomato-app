import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './quickSearch.css';

const quickSearchURL = 'https://restaurantdatafetch.onrender.com/quickSearch';


export class QuickSearch extends Component {
    constructor(){
        super()
        this.state={
            quickSearchData:[],
            loading:true
        }
    }
    componentDidMount = () => {
      axios.get(quickSearchURL)
        .then(res => {
          this.setState({
            quickSearchData: res.data,
            loading: false 
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          this.setState({
            loading: false 
          });
        });
    }
    
  render() {
    
    const {quickSearchData,loading}=this.state

    return (
      <div className='container-fluid quickSearch-container pt-5 pb-5'>
      <div className=' quickSearch-container'>
        <h2>Quick Searches</h2>
        <p>Discover restaurants by type of meal</p>
        {!loading &&
        <div className='card-container'>
       {quickSearchData.map(mealType=>  <Link  to={`listing/${mealType.mealtype_id}`} key={mealType._id}><div className='card'>
            <img src={mealType.meal_image} alt={mealType.mealtype}/>
            <div className='cardContent'>
                <h3>{mealType.mealtype}</h3>
                <p>{mealType.content}</p>
            </div>
        </div></Link>)}
        </div>}
        {loading && <div style={{color:'#192F60',height:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}><h1>Loading...</h1></div>}
      </div>
      </div>
    )
  }
}

export default QuickSearch
