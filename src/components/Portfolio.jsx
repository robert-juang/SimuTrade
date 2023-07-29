import React, {useContext, useEffect} from 'react'
import "../styles/Portfolio.css"

import { simulationContext } from "../Dashboard";


function Portfolio() {

  const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);

  return (
    <div>
        {startSimulation ? 
          <table className="styled-table">
              <thead>
                  <tr>
                      <th>Symbol</th>
                      <th>Current Price</th>
                      <th>Purchase Price</th>
                      <th>Total Cost</th>
                      <th>Current Value</th>
                      <th>Quantity</th>
                      <th>Gain/Loss</th>
                      <th>Gain/Loss %</th>
                      <th>Trade Action</th>
                  </tr>
              </thead>
              <tbody>
                 {stockList.getTrades().map((tradeObject,index) => {
                  return (<tr key={index}>
                      <td>{tradeObject.symbol}</td>
                      <td>{tradeObject.current_price}</td>
                      <td>{tradeObject.purchase_price}</td>
                      <td>{tradeObject.totalCost}</td>
                      <td>{tradeObject.findCurrentValue()}</td>
                      <td>{tradeObject.trade_action==="Buy" ? tradeObject.quantity : -1*tradeObject.quantity}</td>
                      <td>{tradeObject.PnL}</td>
                      <td>{tradeObject.findPnLPercent()}%</td>
                      <td>{tradeObject.trade_action}</td>
                  </tr>)
                 })}
              </tbody>
          </table>
      : <div></div>}
    </div>
  )
}

export default Portfolio