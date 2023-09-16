import {useContext} from 'react';
import AuthContext from '../components/context/AuthContext';

const useAuth=()=>{
    return useContext(AuthContext);
}

export default useAuth;