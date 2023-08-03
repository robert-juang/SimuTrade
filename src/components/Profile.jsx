import React, { useState, useEffect } from 'react'
import "../styles/Profile.css"
import { useAuth } from "../contexts/AuthContext"
import profilePic from "../assets/image.jpeg"

function Profile({update, logout}) {

  const [username, setUsername] = useState()
  const { currentUser, updatePassword, updateEmail } = useAuth()

  useEffect(() => {
    console.log(currentUser);
  }, [])

  return (
    <div className="setting">
      <div class="settings">
        <h3>Your Profile <img className="account-profile" src={profilePic}></img></h3> 
        <div>
          <div>
            <span id="C1">Email: {currentUser.email}</span> <button onClick={update}>Update Profile </button>
          </div>
          <div>
            <span id="C1">Date Created: add date here</span> <button onClick={logout}>Logout</button> 
          </div>
        </div>
      </div>
      <div class="settings">
        <h3>Simulation History</h3>
      <span>Number of Simulations Completed: Number of Sim</span>
      </div>
    </div>

  )
}

export default Profile
