
import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import SecondPage from './components/secondPage/secondPage';
import ThirdPage from './components/thirdPage/thirdPage';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='listing/:mealId' element={<SecondPage/>}/>
      <Route path='details/:restaurantId' element={<ThirdPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
