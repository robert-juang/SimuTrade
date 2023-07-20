import react, {useState} from 'react'; 
import "../styles/Navigation.css"
import { useAuth } from "../contexts/AuthContext" 
import { Link, useNavigate } from "react-router-dom"

import ShowChartIcon from '@mui/icons-material/ShowChart';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';

function Navigation({setState}) {

function changeState(s){
    setState(s) 
}

  return (
    <div className="navbar">
        <div className="navicon">
            SimuTrade
        </div>
        <div className="nav">
              <div className="nav-option" onClick={() => changeState("home")}> <HomeIcon /> Homepage </div>
              <div className="nav-option" onClick={() => changeState("portfolio")}> <ListAltIcon /> Portfolio </div>
              <div className="nav-option" onClick={() => changeState("trade")}> <ShowChartIcon /> Trade </div>
              <div className="nav-option" onClick={() => changeState("news")}><FeedIcon /> News </div>
              <div className="nav-option" onClick={() => changeState("profile")}> <PersonIcon /> Profile </div>
        </div>
    </div>
  )
}

export default Navigation