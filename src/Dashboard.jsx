import react, {useState} from 'react'; 
import { Link, useNavigate } from "react-router-dom"
import './App.css'
import { useAuth } from "./contexts/AuthContext"


function App() {
  const [cur, setCur] = useState("Home"); 
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

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
      <div className="home">
        <div className="logout">
          {error && <div className="error">{error}</div>}
          <button onClick={handleUpdate}>Update Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default App
