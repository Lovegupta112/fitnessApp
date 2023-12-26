import {Routes,Route}from 'react-router-dom';
import './App.css';
import Signup from "./components/Signup/Signup";
import Login from './components/Login';
import Homepage from './pages/Homepage';
import Protected from './util/Protected';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import PerformancePage from './pages/PerformancePage';


const App=()=>{

return (
  <>
    <Header />
   <Routes>
    <Route path='/' element={ <Homepage/>} />
    <Route path='/dashboard' element={<Protected Component={DashboardPage}/>} />
    <Route path='/profile' element={<Protected Component={ProfilePage}/>} />
    <Route path='/activity' element={<Protected Component={ActivityPage} />} />
    <Route path='/performance' element={<Protected Component={PerformancePage} />} />
    <Route path="signup" element={<Signup/>}/> 
    <Route path="login" element={<Login />} />
   </Routes>
  </>
)
}

export default App;