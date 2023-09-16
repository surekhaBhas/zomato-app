import {useState,useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './quickSearch.css';
import UseAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {useNavigate,useLocation} from 'react-router-dom'


function QuickSearch() {
  const axiosPrivate=UseAxiosPrivate();
  const  navigate=useNavigate();
  const location=useLocation()

  const [quickSearchData,setQuickSearchData]=useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    let isMounted=true;
    const controller=new AbortController()
    
    const getQuickData=async()=>{
    try{
      const response=await axiosPrivate.get('/quickSearch',{
        signal:controller.signal
      })
    
      isMounted && setQuickSearchData(response.data)
      setLoading(false)
    }catch(error){
      if(error.message!=='canceled') {
        navigate('/login', { state: { from: location }, replace: true });
        console.log(error)
      }
      setLoading(true)
    }
  }
  getQuickData();
  return()=>{
    isMounted=false;
    controller.abort();
  }
  },[])
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

export default QuickSearch;
