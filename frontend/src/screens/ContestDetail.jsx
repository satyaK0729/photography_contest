import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
function ContestDetail() {
    const [contest, setContest] = useState()
    const [loading,setLoading]=useState(true)
    const { id } = useParams()
   const users = useSelector((state) => { return state.users })
    const [image, setImage] = useState('')
    const [imageShow,setImageShow]=useState()

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
    const fetchContest = async () => {
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/contest/getContestByID', { id })
           if(res.data.success){
                 setContest(res.data.message)
                 setLoading(false)
           }else{
            toast.error(res.data.message)
                 navigate('/contests')
                 setLoading(false)
           }
            setContest(res.data.message)
        } catch (err) {
            console.log(err)
            navigate('/contests')
        }
    }

    useEffect(() => {
        fetchContest()
    }, [])
const handleLikeImg=async(image)=>{
    try{
console.log(image)
        const res = await axios.post('http://localhost:8000/api/photo/likePhoto', {"id":image?._id,"ContestId":contest._id})
        if(res.data.success){
            toast.success('Liked Successfully')
            await fetchContest()
        }else{
            toast.error(res.data.message)
        }
    }catch(err){
        toast.error('Something went wrong')
    }
}    
const declareWinner=async()=>{
    try{
        toast.loading('Please wait...')
        const res = await axios.post('http://localhost:8000/api/contest/makeWinner', {"id":contest._id})
        toast.dismiss()
        if(res.data.success){
            toast.success('Winner Declared Successfully')
            await fetchContest()
        }else{
            toast.error(res.data.message)
        }
    }catch(err){
        toast.error('Something went wrong')
        toast.dismiss()
    }
}
    const handleParticipate=async()=>{
        try{
            const formData = new FormData();
            formData.append('photo', image);
            formData.append('id', id);
            toast.loading('Please wait...')
            const res = await axios.post('http://localhost:8000/api/contest/participateInContest', formData);
            toast.dismiss()
            if(res.data.success){
                toast.success('Participated Successfully')
               await fetchContest()

            }else{
                toast.error(res.data.message)
            }
            setImage(null)
            setImageShow(null)
        }catch(err){
            toast.error('Something went wrong')
            toast.dismiss()
        }
    }
  return (
    <div className='contest_detail'>
        {
            loading ? <h3>Loading...</h3> :
                <>
                    <h1>Contest Related To {contest?.title}</h1>
                    <img className='contest_detail_img' src={contest?.bannerImg?.name} alt={contest.title} />
                    
                   {
                    contest?.status!="Ended"?
<>
                    <label className='contest_detail_part' htmlFor='part'>Participate</label>
                    <input  onChange={handleImgChange} name="part" type="file" id="part" style={{ display: 'none' }} />
                    </>
                    :
                    null
                   } 

                    {users?.userdata?.isAdmin && contest?.status!="Ended"? <button onClick={()=>{declareWinner()}} className='contest_detail_part'>Declare Winner</button>:null}
 {
imageShow?
<>
<h1>Participate With This Image :</h1>
<img className='participate_img_user' src={imageShow} alt='participate' />
<button onClick={handleParticipate} className='participate_btn'>Submit</button>
</>:null
 }
                    <h1>Contest Details</h1>
                    {contest?.status=="Ended"?<div className='contest_detail_info'>Winner:  <p>{contest?.winner?.username}</p></div>:null}
                    <div className='contest_detail_info'>Status:  <p>{contest?.status}</p></div>
                    <div className='contest_detail_info'>Description:  <p>{contest?.description}</p></div>
                    <div className='contest_detail_info'>Start Date: <p> {new Date(contest?.startDate).toLocaleDateString()}</p></div>
                    <div className='contest_detail_info'>End Date: <p> {new Date(contest?.endDate).toLocaleDateString()}</p></div>
                    <div className='contest_detail_info'>Registration End Date: : <p> {new Date(contest?.RegistrationEndDate).toLocaleDateString()}</p></div>
                    <div className='contest_detail_info'>Total Participants :<p> {contest?.participants.length}</p></div>
                    
                    {contest?.status=="Ended"?
                    <>
    
                    <h1>Winning Image</h1>
                   <img className='contest_images_img' src={contest?.winningImage} alt='winner' />
                   </>
                   :null}

                    <h1>Contestants Images</h1>
                    <div className='contest_images'>
                        {
                            contest?.images?.length !== 0 ? contest?.images?.map((image, index) => {
                                {console.log(image?.likes)}
                                return (                             
                                    <div key={index} className='contest_images_item'>
                                <img className='contest_images_img' key={index} src={image?.name} alt={contest.title} />
                                <p>Likes: {image?.likes?.length}</p>
                                {contest?.status!="Ended"?<AiFillLike onClick={(e)=>{handleLikeImg(image)}} className='contest_image_like' />:null}
                                </div>

                            )

                            }) : <h3>No Images Yet</h3>
                        }
                        </div>
                </>
        }


    </div>
  )
}

export default ContestDetail
