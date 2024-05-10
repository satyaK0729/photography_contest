import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Contests() {
    const [onGoingContests, setOnGoingContests] = useState([])
    const [upcomingContests, setUpcomingContests] = useState([])
    const [pastContests, setPastContests] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

    useEffect(() => {
        const fetchContests = async () => {
            try {
                setLoading(true)
                const res = await axios.post('http://localhost:8000/api/contest/getContests')
                console.log(res.data)
                setOnGoingContests(res.data?.message?.onGoing)
                setUpcomingContests(res.data?.message?.upcoming)
                setPastContests(res.data?.message?.ended)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchContests()
    }, [])
    return (
        <ProtectedRoute>
            <div className='contests'>
                {
                    loading ? <h3>Loading...</h3> :
                        <>

                            <div className='contest_part_1'>
                                <h1>OnGoing Contests</h1>
                                <div className='contests_list'>
                                    {
                                        onGoingContests.length !== 0 ? onGoingContests?.map((contest, index) => {
                                            return <div key={index} className='contest_card'>
                                                <img src={contest?.bannerImg?.name} alt={contest.title} />

                                                <h3>{contest?.title.toUpperCase()}</h3>
                                                <p>{contest?.description}</p>
                                                <button className='contest_btn'>
                                                    <div>Start Date:</div>
                                                    <div>{new Date(contest?.startDate).toLocaleDateString()}</div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>End Date:</div>
                                                    <div> {new Date(contest?.endDate).toLocaleString()}
                                                    </div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>Registration End Date:</div>

                                                    <div> {new Date(contest?.RegistrationEndDate).toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button onClick={(e)=>{navigate(`/contest/${contest._id}`)}} className='contest_card_det'>
                                                    View Details
                                                </button>
                                            </div>
                                        })
                                            :
                                            <h4>No Contests Found !</h4>
                                    }
                                </div>
                            </div>
                            <div className='contest_part_2'>

                                <h1>Upcoming Contests</h1>
                                <div className='contests_list'>
                                    {
                                        upcomingContests.length !== 0 ? upcomingContests?.map((contest, index) => {
                                            return <div key={index} className='contest_card'>
                                                <img src={contest?.bannerImg?.name} alt={contest.title} />

                                                <h3>{contest?.title.toUpperCase()}</h3>
                                                <p>{contest?.description}</p>
                                                <button className='contest_btn'>
                                                    <div>Start Date:</div>
                                                    <div>{new Date(contest?.startDate).toLocaleDateString()}</div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>End Date:</div>
                                                    <div> {new Date(contest?.endDate).toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>Registration End Date:</div>

                                                    <div> {new Date(contest?.RegistrationEndDate).toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button onClick={(e)=>{navigate(`/contest/${contest._id}`)}} className='contest_card_det'>
                                                    View Details
                                                </button>
                                            </div>
                                        })
                                            :
                                            <h4>No Contests Found !</h4>
                                    }
                                </div>
                            </div>
                            <div className='contest_part_3'>

                                <h1>Past Contests</h1>
                                <div className='contests_list'>
                                    {
                                        pastContests.length !== 0 ? pastContests?.map((contest, index) => {
                                            return <div key={index} className='contest_card'>
                                                <img src={contest?.bannerImg?.name} alt={contest.title} />

                                                <h3>{contest?.title.toUpperCase()}</h3>
                                                <p>{contest?.description}</p>
                                                <button className='contest_btn'>
                                                    <div>Start Date:</div>
                                                    <div>{new Date(contest?.startDate).toLocaleDateString()}</div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>End Date:</div>
                                                    <div> {new Date(contest?.endDate).toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button className='contest_btn'>
                                                    <div>Registration End Date:</div>

                                                    <div> {new Date(contest?.RegistrationEndDate).toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button onClick={(e)=>{navigate(`/contest/${contest._id}`)}} className='contest_card_det'>
                                                    View Details
                                                </button>
                                            </div>
                                        })
                                            :
                                            <h4>No Contests Found !</h4>
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </ProtectedRoute>
    )
}

export default Contests
