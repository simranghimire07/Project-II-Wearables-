import React from 'react'
import Layout from '../components/Layout/Layout';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'; 

function Success() {

  const navigate = useNavigate();
  localStorage.removeItem("cart");
  useEffect(()=>{
    setTimeout(()=>{
        navigate('/')
    },3000)
  },[])
  return (
    <Layout title={"Success - Wearables"}>
        <h1 className="mt-10">Thank you for making the purchase!</h1>
        <h2>You will be soon redirected to home page</h2>
    </Layout>
  )
}

export default Success