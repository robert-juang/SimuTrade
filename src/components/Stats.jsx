import React, { useState, useContext } from 'react'
import "../styles/Stats.css"

import { simulationContext } from "../Dashboard";

function Stats() {

  const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);
  
  const [change, setChange] = useState(0.00);
    
  return (
    <div className="stats">
        <div className="stats-title">
            <div className="trade-title">Simulation Stats</div>
        </div>
        <div className="stats-content">
            <div>
                Portfolio Value: ${portfolio}
            </div>
            <div>
                Gain/Loss: {change}%
            </div>
            <div>
                Start Date: {startDate}
            </div>
            <div>
                Current Date: {currentDate}
            </div>
        </div>
    </div>
  )
}

export default Stats