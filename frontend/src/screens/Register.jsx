import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  
  const submitHandler=async  (e)=>{
    e.preventDefault()
    console.log(name,email,password)
    if(!name || !email || !password){
      return toast.error('Please fill all the fields')
    }else if(password.length<6){
      return toast.error('Password must be atleast 6 characters')
    }else{
      toast.loading('Please wait...')
      const res=await axios.post('http://localhost:8000/api/user/register',{"username":name,email,password})
      toast.dismiss()
      if(res.data.success==true){
        toast.success('Registration Successfull')
        navigate('/login')
      }else{
        toast.error(res.data.message)
      }
    }
  }
  return (
    <div className='register'>
      <h3>Sign Up</h3>
      <form>
        <input type="text" placeholder="Enter Your Name..." value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Enter Your Email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Your Password..." value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={submitHandler} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
