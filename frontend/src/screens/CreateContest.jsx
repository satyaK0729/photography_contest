import React, { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminProtectedRoute from '../components/AdminProtectedRoute'
import { toast } from 'react-toastify'
import axios from 'axios'

function CreateContest() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [regEndDate, setRegEndDate] = useState('')
    const [image, setImage] = useState('')
    const [imageShow,setImageShow]=useState()

    const submitHandler=async(e)=>{
        e.preventDefault()
        try{

    if(!title || !description || !startDate || !endDate || !image || !regEndDate){
        toast.error('Please fill all the fields')

    // error happening when the all are same dates
    // }else if(startDate>endDate){
    //     toast.error('Start Date should be less than End Date')
    // }else if(regEndDate<new Date().toISOString().split('T')[0]){
    //     toast.error('Registration End Date should be greater than current date')
    // }else if(startDate<regEndDate){
    //     toast.error('Start Date should be greater than Registration End Date')
    // }else if(startDate==endDate || startDate==regEndDate || endDate==regEndDate){
    //     toast.error('Dates should not be same')        
    }else{
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('RegistrationEndDate', regEndDate);
        formData.append('photo', image);
        toast.loading('Please wait...')

        const res = await axios.post('http://localhost:8000/api/contest/newContest', formData);
        toast.dismiss()
        if(res.data.success){
            toast.success('Contest Created Successfully')
            
        }else{
            toast.error(res.data.message)
        }
    }}catch(err){
        toast.error('Something went wrong')
        toast.dismiss()
    }
}


    const handleImgChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                toast.error(`Error: Only JPEG and PNG images are allowed.`);
            } else {
                setImage(file);
                const imageURL = URL.createObjectURL(file);
                setImageShow(imageURL);
            }
        }
    };
    
    return (
        <ProtectedRoute>
            <AdminProtectedRoute>
                <div className='create_contest'>
                    <h1>Create Contest</h1>
                        <div className='form_input_item'>
                        <label htmlFor="title">Title</label>
                        <input name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Enter Contest Title..." />
                        </div>
                      


                        <div className='form_input_item'>
                            <label htmlFor="description">Description</label>
                            <input name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder="Enter Contest Description..." />
                        </div>




                        <div className='form_input_item'>
                            <label name="startDate" htmlFor="startDate">Start Date</label>
                            <input name="startDate" value={startDate} onChange={(e) => { setStartDate(e.target.value) }} type="date" placeholder="Enter Contest Start Date..." />
                        </div>



                        <div className='form_input_item'>
                            <label name="endDate" htmlFor="endDate">End Date</label>
                            <input name="endDate" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} type="date" placeholder="Enter Contest Start Date..." />
                        </div>



                        <div className='form_input_item'>
                            <label name="regEndDate" htmlFor="regEndDate">Registration End Date</label>
                            <input name="regEndDate" value={regEndDate} onChange={(e) => { setRegEndDate(e.target.value) }} type="date" placeholder="Enter Contest End Date..." />
                        </div>



                        <div className='form_input_item'>
                            <label name="photo" htmlFor="image">Banner Image</label>
                            <input  name="photo" onChange={handleImgChange} type="file" placeholder="Add Banner Image..." />
                        </div>
                        {
                            imageShow ? <img className='bannerImg' src={imageShow} alt='banner' /> :null
                        
                        }
                        <button onClick={submitHandler} className='form_button'>Create Contest</button>

                </div>
            </AdminProtectedRoute>
        </ProtectedRoute>
    )
}

export default CreateContest
