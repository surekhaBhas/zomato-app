import React, { Component } from 'react'
import axios from 'axios';
import './filter.css';
import {AiOutlineDown} from 'react-icons/ai'

export class Filter extends Component {
constructor(props){
    super(props)
    this.state={
        locationsData:[],
        valueArray:[],
        locationId:'',
        lowCost:'',
        highCost:'',
        sort:'',
        display:false
    }
   
}
  
     componentDidMount(){
        const {cityId}=this.props
        if(cityId){
            axios.get(`https://restaurantdatafetch.onrender.com/locations?city_id=${cityId}`)
         .then(res=>{this.setState({locationsData:res.data})})
        }else{
       axios.get('https://restaurantdatafetch.onrender.com/locations')
       .then(res=>{this.setState({locationsData:res.data})})
        }
     } 
     onChangeLocation=async (e)=>{
         const value=e.target.value
         this.setState({locationId:value})
        
     }

     onChangeCuisine = (e) => {
      const value = Number(e.target.value);
      const isChecked = e.target.checked;
  
      this.setState((prevState) => {
          
          const updatedValueArray = [...prevState.valueArray];
  
          if (isChecked) {
              
              updatedValueArray.push(value);
          } else {
              
              const index = updatedValueArray.indexOf(value);
              if (index !== -1) {
                  updatedValueArray.splice(index, 1);
              }
          }
  
        
          return { valueArray: updatedValueArray };
      });
  }
  
    
    changeInCost=async(e)=>{
        if(e.target.checked){
            let value=e.target.value.split('-')
            let lcost=value[0]
            let hcost=value[1]
            this.setState({lowCost:lcost,highCost:hcost})
        }
    }
   
    onSortByPrice=async(e)=>{
        if (e.target.checked){
           await this.setState({sort:e.target.value})
        }
        
    }
    sendResponseDataToParent = (responseData) => {
        this.props.onResponseDataReceived(responseData);
      }; 
    applyingData=async()=>{
        const {mealId}=this.props;
        const {valueArray,locationId,sort,lowCost,highCost}=this.state
        let url = `https://restaurantdatafetch.onrender.com/filter/${mealId}?`;

     if (valueArray && valueArray.length) {
      url += `cuisine_id=${valueArray.join(',')}&`;
      }

      if (locationId) {
       url += `location_id=${locationId}&`;
       }

      if (sort) {
       url += `sort=${sort}&`;
     }

      if (lowCost && highCost) {
       url += `lcost=${lowCost}&hcost=${highCost}`;
      }
     
   
    
        this.sendResponseDataToParent(url)
       
    }
    displayCard=()=>{
      this.setState(prevState=>{
        return ({display:!prevState.display})
      })
    }

  render() {
    return (
      <div className='box-container'>
        <div className='off-screen' onClick={this.displayCard}>
        <span>Filters / Sort</span>
        <span><AiOutlineDown/></span>
        </div>
      <div className={this.state.display?'show filter-container':'hide filter-container'}>
        <h4 className='filters'>Filters</h4>
        <div>
            <p className='label'>
                Select Location
            </p>
            <select className='selectTag' onChange={this.onChangeLocation}>
                <option>Select Location</option>
               {
                this.state.locationsData.map(location=><option key={location._id} value={location.location_id}>{location.name}</option>)
               }
            </select>
        </div>
         <div>
            <p className='label'>Cuisine</p>
            <div className='checkbox'>
            <input type='checkbox' id='cid1' value='1' onClick={this.onChangeCuisine}/>
            <label htmlFor='cid1' className='labelName'>North Indian</label>
            </div>
            <div className='checkbox'>
            <input type='checkbox' id='cid2' value='2' onClick={this.onChangeCuisine}/>
            <label htmlFor='cid2' className='labelName'>South Indian</label>
            </div>
            <div className='checkbox'>
            <input type='checkbox' id='cid3' value='3' onClick={this.onChangeCuisine}/>
            <label htmlFor='cid3' className='labelName'>Chinese</label>
            </div>
            <div className='checkbox'>
            <input type='checkbox' id='cid4' value='4' onClick={this.onChangeCuisine}/>
            <label htmlFor='cid4' className='labelName'>Fast Food</label>
            </div>
            <div className='checkbox'>
            <input type='checkbox' id='cid5' value='5' onClick={this.onChangeCuisine}/>
            <label htmlFor='cid5' className='labelName'>Street Food</label>
            </div>
         </div>
         <div>
            <p className='label'>Cost For Two</p>
            <div className='radioBox'>
                <input type='radio' id='rid1' value='0-500' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid1' className='labelName'>Less than 500</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid2' value='500-1000' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid2' className='labelName'>500 to 1000</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid3' value='1000-1500' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid3' className='labelName'>1000 to 1500</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid4' value='1500-2000' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid4' className='labelName'>1500 to 2000</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid5' value='2000-10000' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid5' className='labelName'>2000+</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid6' value='0-10000' name='cost' onChange={this.changeInCost}/>
                <label htmlFor='rid6' className='labelName'>All</label>
            </div>
         </div>
         <h3 className='sort'>Sort</h3>
         <div>
           <div className='radioBox'>
                <input type='radio' id='rid6' value='1' name='sort' onChange={this.onSortByPrice}/>
                <label htmlFor='rid6' className='labelName'>Price low to high</label>
            </div>
            <div className='radioBox'>
                <input type='radio' id='rid7' value='-1' name='sort' onChange={this.onSortByPrice}/>
                <label htmlFor='rid7' className='labelName'>Price high to low</label>
            </div>
         </div>
         <button style={{color:"red",border:"2px solid red",width:'100%',marginTop:"10px",cursor:'pointer'}} onClick={this.applyingData}>Apply</button>
      </div>
      </div>
    )
  }
}

export default Filter
