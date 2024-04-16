
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
function App() {
  return (
    <>
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/*' element={<NotFound/>}/>
    
    </Routes>
    </>
  );
}

export default App;
