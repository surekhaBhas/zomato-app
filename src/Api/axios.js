import axios from 'axios';

export default axios.create({
    baseURL:/*'http://localhost:8900//'*/"https://restaurantdatafetch.onrender.com"
})

export const axiosPrivate=axios.create({
    baseURL:/*'http://localhost:8900' */'https://restaurantdatafetch.onrender.com',
    headers:{
        "Content-Type":"application/json",
        withCredentials:true
    }
})