import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../assets/images/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setdata, setisLoggedin } from '../redux/reducers/userSlice';

const Navbar = () => {
    const navigate = useNavigate()
    const users = useSelector((state) => { return state.users })
    const dispatch = useDispatch()
    console.log(users)
    const logoutHandler = async (e) => {
        e.preventDefault()
        toast.loading('Please wait...')
        const res = await axios.post('http://localhost:8000/api/user/logout');
        toast.dismiss()
        if (res.data.success == true) {
            dispatch(setisLoggedin(false))
            dispatch(setdata(null))
            toast.success('Logout Successfull')
            navigate('/login')
        } else {
            toast.error("something went wrong !")
        }
    }
    return (
        <nav className="navbar">
            <div className="navbar_left">
                <img src={img} alt="logo" className="navbar_logo" />
                <h1 onClick={() => { navigate("/") }}>PhotoGraphy Contest</h1>
            </div>
            <div className="navbar_center">
                <a href="/" className="navbar_link">Home</a>
                <a href="/contests" className="navbar_link">Contest</a>
                {users?.userdata?.isAdmin ?
                    <a href="/create-contest" className="navbar_link">Create Contest</a>

                    : null}

            </div>

            <div className="navbar_right">
                {users.isloggedin ?
                    <>
                        <button onClick={() => { navigate("/profile") }} className="navbar_button_login">Profile</button>
                        <button onClick={logoutHandler} className="navbar_button_register">Logout</button>
                    </>
                    :
                    <>
                        <button onClick={() => { navigate("/login") }} className="navbar_button_login">Login</button>
                        <button onClick={() => { navigate("/register") }} className="navbar_button_register">Register</button>
                    </>
                }
            


            </div>
        </nav>
    );
};

export default Navbar;
