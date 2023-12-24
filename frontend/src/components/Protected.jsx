
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials=true;

const Protected = (props) => {
    const {Component}=props;

    const navigate=useNavigate();

    useEffect(()=>{
      // checkauth();
    },[]);

    async function checkauth(){
      try{
        const res=await axios.get('/protected',{withCredentials:true});
        console.log(res.data);
      }
      catch(error){
       console.log('Error: ',error);
      }
    }
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected