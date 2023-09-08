import React from 'react'
import './displayRestaurant.css';
import { Link } from 'react-router-dom';

function DisplayRestaurant(props) {
    const {responseData,onChangePage,totalPages,page}=props
    const response=  responseData.data
     
    const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
 const onPageChangeNumber=(number)=>{
    onChangePage(number)
  }
  
  return (
    <div>
    <ul className='display-container'>
      {response.length?(response.map(restaurant=>{
        return <Link to={`/details/${restaurant.restaurant_id}`} key={restaurant._id}><li  className='restaurant-card'>
            <div className='name-container'>
              <img src={restaurant.thumb} alt={restaurant.name}/>
              <div >
                <h2 className='restaurantName'>{restaurant.name}</h2>
                <p className='locality'>{restaurant.locality}</p>
              </div>
            </div>
            <div className='cuisne-cost'>
              <div className='cuisine'>
                <p>Cuisine:</p><h6>{restaurant.Cuisine[0].name}, {restaurant.Cuisine[1].name}</h6>
              </div>
              <div className='cuisine'>
                <p>Cost:</p><h6>{restaurant.cost}</h6>
              </div>
            </div>
            <div>

            </div>
        </li></Link>
      })):<li className='not-found'><div>Sorry, No Restaurant Found</div></li>}
    </ul>
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            
          >
            <button onClick={() => onPageChangeNumber(number)} className={page === number ? 'page-link active' : 'page-link'}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  )
}

export default DisplayRestaurant
