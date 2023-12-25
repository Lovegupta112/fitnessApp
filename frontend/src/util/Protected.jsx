import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const Protected = (props) => {
  const { Component } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    checkauth();
  }, [auth]);

  // async function checkauth(){
  //   try{
  //     const res=await axios.get('/protected',{withCredentials:true});
  //     console.log(res.data);
  //   }
  //   catch(error){
  //    console.log('Error: ',error);
  //   }
  // }
  function checkauth() {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
  }
  return <div>{isAuthenticated ? <Component /> : null}</div>;
};

export default Protected;
