
import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import SecondPage from './components/secondPage/secondPage';
import ThirdPage from './components/thirdPage/thirdPage';
import DetailsForm from './components/thirdPage/detailsForm/DetailsForm';
import PaymentMethod from './components/thirdPage/paymentMethod/paymentMethod';
import MenuOrder from './components/thirdPage/MenuOrder/MenuOrder';
import RegisterForm from './components/registerForm/RegisterForm';
import LogInForm from './components/loginForm/LoginForm';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/requireAuth';
import DisplayOrder from './components/DisplayOrders/DisplayOrder';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  'user': 2001,
  'editor': 1984,
  'admin': 5150
}


function App() {
  return (
    <div >
     <Routes>
      <Route path='login' element={<LogInForm/>}/>
      <Route path='register' element={<RegisterForm/>}/>
      <Route path='unauthorized' element={<Unauthorized/>}/>
     
      
   
      <Route element={<PersistLogin/>}>
      <Route element={<RequireAuth allowedRoles={[ROLES.user]}/>}>
      
      <Route path='/' element={<HomePage/>}/>
      <Route path='listing/:mealId' element={<SecondPage/>}/>
      <Route path='details/:restaurantId' element={<ThirdPage/>}/>
      <Route path='menus/:restaurantId' element={<MenuOrder/>}/>
      <Route path='orderForm' element={<DetailsForm/>}/>
      <Route path="orderDisplay/:orderId" element={<DisplayOrder/>}/>
      <Route path='payment/:orderId' element={<PaymentMethod/>}/>
      </Route>
      </Route>
      
      
      </Routes>
    </div>
  );
}

export default App;
