import {Routes,Route}from 'react-router-dom';
import './App.css';
import Signup from "./components/Signup/Signup";
import Login from './components/Login';
import Homepage from './pages/Homepage';
import Protected from './components/Protected';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';


const App=()=>{

return (
  <>
    <Header />
   <Routes>
    <Route path='/' element={<Protected Component={Homepage}/>} />
    <Route path='/dashboard' element={<Protected Component={Dashboard}/>} />
    <Route path="signup" element={<Signup/>}/> 
    <Route path="login" element={<Login />} />
   </Routes>
  </>
)
}

export default App;