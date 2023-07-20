import React from 'react'
import "../styles/Profile.css"

function Profile() {
  return (
      <div class="settings">
          <h3>Account Settings</h3>
          <div class="information">
              <span>Account Information</span>
          </div>
          <div class="contents">
              <span id="C1">Username: add user here</span>
              <span id="C1">Date Created:add user here</span>
              <span id="C1">Number of Simulations Completed:add simulation here</span>
          </div>
      </div>
  )
}

export default Profile