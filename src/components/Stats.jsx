import React from 'react'
import "../styles/Stats.css"

function Dashboard() {
  return (
    <div className="stats">
        <div className="stats-title">
            <div className="trade-title">Simulation Stats</div>
        </div>
        <div className="stats-content">
            <div>
                Portfolio Value: $100,000
            </div>
            <div>
                Gain/Loss: -100%
            </div>
            <div>
                Sim Time: 7/20/2023
            </div>
        </div>
    </div>
  )
}

export default Dashboard