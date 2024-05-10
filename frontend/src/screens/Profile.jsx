import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useSelector } from 'react-redux'

function Profile() {
    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <ProtectedRoute >
            <div className='profile'>
                <h2>Your Profile</h2>
                <div className='profile_details'>
                    <p>Name :
                        <div>{users?.userdata?.username}</div>
                    </p>
                    <p>Email :
                        <div>{users?.userdata?.email}</div>
                    </p>
                    <p>isAdmin :
                        <div>{users?.userdata?.isAdmin?"Yes":"No"}</div>
                    </p>
                </div>
            </div>


        </ProtectedRoute>
    )
}

export default Profile
