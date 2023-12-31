import React, { useState, useContext, useEffect } from 'react'
import "../styles/Homepage.css"
import PortfolioChart from "./charts/PortfolioChart" 
import WatchList from './WatchList';
import Stats from './Stats'; 
import PortfolioWidget from "./PortfolioWidget"
import Trade from "./Trade" 

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ReplyIcon from '@mui/icons-material/Reply';
import RedoIcon from '@mui/icons-material/Redo';

import { simulationContext } from "../Dashboard";
import { TradeObject, StocksObject } from "../logic/stock.ts"

function Homepage() {
  const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList, PortfolioChartArray, setPortfolioChartArray } = useContext(simulationContext);

  //keep this local for now
  const [timeframe, setTimeframe] = useState("1d (default)"); 
  const [Today, setToday] = useState(""); 
  const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleStartAmount = (e) => {
    setPortfolio(e.target.value);
  }

  const handleTimeframe = (e) =>{
    setTimeframe(e.target.value);
  };

  const toggleAdditionalSettings = (e) => {
    e.preventDefault(); 
    setShowAdditionalSettings(prevState => !prevState);
  };

  //stop simulation
  function stopSim(){
    if (startSimulation){
      setStartSimulation(false); 
    }
    setStockList(new StocksObject());
    setIsRealtime(false) 
  }

  //save simulation
  function saveSim(){
    console.log("saved") 
  }

  //logic for simulation 
  function forwardSimDay() {
    function incrementDate(dateString) {
      // Parse the date string into a date object
      const date = new Date(dateString);

      // Increment the date by one day
      date.setDate(date.getDate() + 1);

      // Concatenate the components into a yyyy-mm-dd string
      return date.toISOString().split('T')[0];
    }
    if (incrementDate(currentDate) <= Today){
      setCurrentDate(incrementDate(currentDate))
    }
    console.log(currentDate) 
  }

  function backwardSimDay() {
    function decrementDate(dateString) {
      // Parse the date string into a date object
      var date = new Date(dateString);

      // Decrement the date by one day
      date.setDate(date.getDate() - 1);

      // Concatenate the components into a yyyy-mm-dd string
      return date.toISOString().split('T')[0];
    }
    if (decrementDate(currentDate) >= startDate) {
      setCurrentDate(decrementDate(currentDate))
    }
    console.log(currentDate) 
  }

  function forwardSimMonth() {
    function incrementMonth(dateString) {
      // Parse the date string into a date object
      const date = new Date(dateString);

      // Increment the month by one
      date.setMonth(date.getMonth() + 1);

      // Concatenate the components into a yyyy-mm-dd string
      return date.toISOString().split('T')[0];
    }
    if (incrementMonth(currentDate) <= Today) {
      setCurrentDate(incrementMonth(currentDate))
    }
    console.log(currentDate)
  }

  function backwardSimMonth() {
    function decrementMonth(dateString) {
      // Parse the date string into a date object
      var date = new Date(dateString);

      // Decrement the month by one
      date.setMonth(date.getMonth() - 1);

      // Concatenate the components into a yyyy-mm-dd string
      return date.toISOString().split('T')[0];
    }
    if (decrementMonth(currentDate) >= startDate) {
      setCurrentDate(decrementMonth(currentDate))
    }
    console.log(currentDate)
  }

  function resetSimDay(){
    setCurrentDate(startDate)
  }
  
  //submit form
  function handleSubmit(e){
    e.preventDefault(); 
    if (!startSimulation){
      setStartSimulation(true); 
    }
    
    if (portfolio === ""){
      setPortfolio(100000);
    }
    setCurrentDate(startDate);
  }

  useEffect(() =>{
    const date = new Date();
    const day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    //calculate correct month to string append
    if (!(Math.floor(month / 10))){ 
      month = "0" + month; 
    }
    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    setToday(currentDate)
  }, [])

  useEffect(() => {
    if (PortfolioChartArray !== undefined) {
      setPortfolioChartArray([...PortfolioChartArray, { "date": currentDate, "portfolio": portfolio }])
    } else {
      setPortfolioChartArray([{ "date": currentDate, "portfolio": portfolio }])
    }
    console.log(PortfolioChartArray)
  }, [currentDate])

  return (
    <>
    <div className="home">
      {!startSimulation && 
      <div className="homemenu">
          <div className="trade-home">
            <div className="trade-title-home">
                Configure Settings <div className="help-outline">
                  <p>
                    This is a stock market trading game. Trade any securities which is allowed by limitations on the API. 
                    The news page is able to provide market updates on the news of the stock at the moment. 
                    For now, please only choose one extended options as choosing both will break the application
                  </p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="trade-start-date">
                Start Date: <input
                  type="date"
                  value={startDate}
                  min="1990-01-01"
                  max={Today}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                Start Balance: <input
                  type="number"
                  placeholder="Default: $100,000"
                  value={portfolio}
                  onChange={handleStartAmount}
                />
              </div>
              <div className="additional-settings">
                Advanced settings:
                {!showAdditionalSettings ? 
                    <ArrowDropDownIcon onClick={toggleAdditionalSettings} /> : <ArrowRightIcon onClick={toggleAdditionalSettings} />
                }
                </div>
                    {showAdditionalSettings &&
                      <>
                        <div className="realtime-checkbox">
                          Realtime-Trading: <input
                        type="checkbox" value={isRealtime} onChange={() => setIsRealtime(!isRealtime)}/>
                        </div>
                        {/* <div className="realtime-checkbox">
                          Enable Bid-Ask Spread: <input type="checkbox" />
                        </div> */}
                        {/* <div className="realtime-checkbox">
                          Enable Exotic Financial Derivatives (e.g. options, futures, swaps, etc): <input type="checkbox" />
                        </div> */}
                      </>
                    }
              <button>Start Trading Simulator</button>
            </form>
          </div>
        </div>
      }

      {(startSimulation && !isRealtime) && 
        <div className="homepage-portfolio">
          <Stats /> 
          <div className="homepage-portfolio-main">
            <PortfolioChart />
          </div>
          <div className="controller-buttons">
            <PlayArrowIcon/><button onClick={forwardSimDay}>+1 Day</button>
            <FastForwardIcon /><button onClick={forwardSimMonth}>+1 Month</button>
            <ReplyIcon /><button onClick={backwardSimDay}>-1 day</button>
            <FastRewindIcon /><button onClick={backwardSimMonth}>-1 Month</button>
            <ReplayIcon /><button onClick={resetSimDay}>Reset</button>
            <SaveAltIcon /><button onClick={saveSim}>Save Simulation</button>
            <CancelIcon /><button onClick={stopSim}>Stop Simulation</button>
          </div>
        </div>
      }

      {(startSimulation && isRealtime) && 
        <div className="trademenu">
          <div className="trading-homepage-main">
            <PortfolioChart/>
            <PortfolioChart />
            <PortfolioWidget/> 
          </div>
          <Trade />
          {/* <button onClick={stopSim}>Stop Simulation</button> */}
        </div>
      }
      </div>
    </>
  )
}

export default Homepage