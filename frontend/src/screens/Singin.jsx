import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { setdata, setisLoggedin } from '../redux/reducers/userSlice';
import axios from 'axios';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const submitHandler=async  (e)=>{
    e.preventDefault()
    if(!email || !password){
      return toast.error('Please fill all the fields')
    }else{
      toast.loading('Please wait...')
      const res=await axios.post('http://localhost:8000/api/user/login',{email,password})
      toast.dismiss()

      if(res.data.success==true){
        toast.success('Login Successfull')
        dispatch(setisLoggedin(true))
        dispatch(setdata(res.data.message))
        navigate('/')
      }else{
        toast.error(res.data.message)
      }
    }
  }
  return (
    <div className='register'>
      <h3>Sign In</h3>
      <form>
        <input type="email" placeholder="Enter Your Email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Your Password..." value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={submitHandler} type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
