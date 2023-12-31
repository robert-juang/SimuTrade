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
import Heatmap from "./components//tradingView/Heatmap"
 
import {TradeObject, StocksObject} from "./logic/stock.ts"

export const simulationContext = React.createContext(false); //global simulation tracker

function App() {
  //did sim start 
  const [startSimulation, setStartSimulation] = useState(false); 
  //current page 
  const [currentState, setCurrentState] = useState("home") 

  //portfolio price 
  const [portfolio, setPortfolio] = useState(100000); 

  //current stocks in Portfolio, takes in stock object of the format: {ticker: AAPL, price: 120, dateBought: sdfas}
  const [stockList, setStockList] = useState(new StocksObject()); 

  //array of objects with the format: {date:"yyyy-mm-dd", portfolio: "val"}
  const [portfolioChartArray, setPortfolioChartArray] = useState([])

  //start and end date
  const [startDate, setStartDate] = useState("2022-01-01"); 
  const [currentDate, setCurrentDate] = useState("2022-01-01"); 
  const [endDate, setEndDate] = useState("2023-07-23"); 
  const [isRealtime, setIsRealtime] = useState(false); 

  //for logging error 
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
      <Navigation setState={setCurrentState}/>
      <div className="content">
        <simulationContext.Provider value={{ startSimulation, setStartSimulation, 
                                            portfolio, setPortfolio, 
                                            startDate, setStartDate, 
                                            currentDate, setCurrentDate, 
                                            endDate, setEndDate, 
                                            isRealtime, setIsRealtime,
                                            stockList, setStockList,
                                            portfolioChartArray, setPortfolioChartArray }}>
          {currentState === "home" && <Homepage/> }
          {currentState === "news" && <News />}
          {currentState === "portfolio" && <Portfolio />}
          {currentState === "profile" && 
            <>
              <Profile update={handleUpdate} logout={handleLogout}/>
              {error && <div className="error">{error}</div>}
            </>}
          {currentState === "trade" && <Trade />}
          {currentState === "heatmap" && <Heatmap/>}
        </simulationContext.Provider>
      </div>
      {/* <Footer/> */}
    </>
  )
}

export default App
