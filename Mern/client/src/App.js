
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Register from './pages/Authorization/Register';
import Login from './pages/Authorization/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Authorization/ForgotPassword';

function App() {
  return (
    <>
  
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='' element={<Dashboard/>}/>
      </Route>
      <Route path='/*' element={<NotFound/>}/>
    
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
