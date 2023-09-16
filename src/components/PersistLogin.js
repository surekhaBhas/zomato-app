import {Outlet} from 'react-router-dom';
import {useState,useEffect} from 'react';
import UseRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

function PersistLogin() {
    const [isLoading,setIsLoading]=useState(true);
    const refresh=UseRefreshToken();
    const {auth,persist}=useAuth();

    useEffect(()=>{
        let isMounted=true;
        const verifyRefreshToken=async()=>{
            try{
               await refresh()
            }catch(err){
               console.error(err)
            }finally{
               isMounted && setIsLoading(false)
            }
        }
        
        !auth?.accessToken && persist ?verifyRefreshToken():setIsLoading(false)
        
        return ()=> isMounted=false
    },[])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT :${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])
  return (
    <>
    {    !persist?
        <Outlet/>:
         isLoading
            ? <p>Loading...</p>
            : <Outlet />
    }
</>
  )
}

export default PersistLogin
