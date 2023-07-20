import React, { useState, useEffect, useContext } from 'react'; 
import { Link, useNavigate } from "react-router-dom"
import './App.css'
import { useAuth } from "./contexts/AuthContext"
import Navigation from "./components/Navigation"

import Homepage from "./components/Homepage"
import News from "./components/News" 
import Portfolio from "./components/Portfolio" 
import Profile from "./components/Profile" 
import Trade from "./components/Trade" 
import Footer from "./Footer"

export const simulationContext = React.createContext(false); //global simulation tracker

function App() {
  const [startSimulation, setStartSimulation] = useState(false); 
  const [currentState, setCurrentState] = useState("home") 
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

  useEffect(() => {
    console.log(currentState); 
  }, [])

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function handleUpdate() {
    history("/update-profile")
  }

  return (
    <>
      <Navigation setState={setCurrentState}/>
      <div className="content">
        <simulationContext.Provider value={{ startSimulation, setStartSimulation }}>
          {currentState === "home" && <Homepage/> }
          {currentState === "news" && <News />}
          {currentState === "portfolio" && <Portfolio />}
          {currentState === "profile" && <Profile />}
          {currentState === "trade" && <Trade />}
        </simulationContext.Provider>
        <button onClick={handleUpdate}>Update Profile</button>
        <button onClick={handleLogout}>Logout</button>
        {error && <div className="error">{error}</div>}
      </div>
      <Footer/>
    </>
  )
}

export default App
