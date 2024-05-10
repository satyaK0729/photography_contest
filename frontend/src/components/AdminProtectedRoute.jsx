import { useDispatch, useSelector } from 'react-redux'
import {  setdata, setisLoggedin } from '../redux/reducers/userSlice'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminProtectedRoute = ({ children }) => {
  const { isloggedin } = useSelector(state => state.users);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const checkSession=async(req,res)=>{
    try{

    const resp=await axios.post("http://localhost:8000/api/user/isLoggedin");
    console.log(resp)
    if(!(resp.data.success==true && resp.data.message.isAdmin==true)){
        toast.error("You are not authorized to access this page")
        navigate('/')
    }
    
  }catch(e){
    toast.error("Something went wrong")
    navigate("/")

  }
   }

  useEffect(()=>{
   checkSession()
  },[navigate])

  return children;
};

export default AdminProtectedRoute;
