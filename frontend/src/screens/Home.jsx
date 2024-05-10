import React from 'react'
import img from "../assets/images/backgroundImg.png"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  return (
    <div className='home'>
      <div className='home_part_1'>
        <h1>Join Our Community, Host and Participate for Free</h1>
        <p>Participate in the contest and win exciting prizes</p>
        <div className='home_buttons'>
        <button onClick={()=>{navigate("/contests")}} className='home_buttons_button2'>Explore</button>
        </div>


      </div>
      <div className='home_part_2'>
<img src={img} alt="background" className='home_part_2_img'/>
      </div>
    </div>
  )
}

export default Home
