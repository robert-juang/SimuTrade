import React from 'react'
import "../styles/RealTimeHomepage.css"
import "../styles/TradingViewWidget.css"
import Heatmap from "./tradingView/Heatmap"
import TradingViewWidget from "./tradingView/TradingViewWidget"

function RealTimeHomepage({search}) {


  return (
    <>
      <div className="heatmap">
        <Heatmap/>
      </div>
      <div className="trading-view-widget">
        <TradingViewWidget search={search}/>
      </div>
    </>
  )
}

export default RealTimeHomepage