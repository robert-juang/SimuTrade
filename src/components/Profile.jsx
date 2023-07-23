import React, {useState, useEffect} from 'react'
import "../styles/Profile.css"
import { useAuth } from "../contexts/AuthContext"

function Profile() {

  const [username, setUsername] = useState()
  const { currentUser, updatePassword, updateEmail } = useAuth()

  useEffect(()=>{
    console.log(currentUser); 
  },[])

  return (
      <div class="settings">
          <h3>Account Settings</h3>
          <div class="information">
              <span>Account Information</span>
          </div>
          <div class="contents">
              <span id="C1">Email: {currentUser.email}</span>
              <span id="C1">Date Created: add date here</span>
              <span id="C1">Number of Simulations Completed: Number of Sim</span>
          </div>
      </div>
  )
}

export default Profile