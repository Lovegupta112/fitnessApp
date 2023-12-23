
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component}=props;

    const navigate=useNavigate();

    useEffect(()=>{
        let cookie=document.cookie;
        console.log(cookie);
    //   if(!login){
    //    navigate('/login');
    //   }
    });

  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected