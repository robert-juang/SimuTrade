import React, { useState, useContext, useEffect } from 'react'
import "../styles/Homepage.css"
import PortfolioChart from "./charts/PortfolioChart" 
import WatchList from './WatchList';
import Stats from './Stats'; 

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import { simulationContext } from "../Dashboard";

function Homepage() {
  const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);

  //keep this local for now
  const [timeframe, setTimeframe] = useState("1d (default)"); 
  const [Today, setToday] = useState(""); 
  const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDateEnd = (e) =>{
    setEndDate(e.target.value); 
  }

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
    setCurrentDate(incrementDate(currentDate))
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
    setCurrentDate(decrementDate(currentDate)) 
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
    setCurrentDate(incrementMonth(currentDate))
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
    setCurrentDate(decrementMonth(currentDate))
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

  return (
    <>
    <div className="home">
      {!startSimulation && 
      <div className="homemenu">
          <div className="trade">
            <div className="trade-title">
                Adjust your Trading Time <div className="help-outline">
                  <p>
                    This is a stock market trading game. You will be able to
                    trade any securitiy you want. The Trading Simulator allows you to trade
                    up to whatever is allowed by the data on the API. The news page is able to provide
                    market updates on the news of the stock at the moment
                  </p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                Start Date: <input
                  type="date"
                  value={startDate}
                  min="1990-01-01"
                  max={Today}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                End Date: <input
                  type="date"
                  value={endDate}
                  min="1990-01-01"
                  max={Today}
                  onChange={handleDateEnd}
                />
              </div>
              <div className="realtime-checkbox">
                {/* <div className="help-outline">
                  <p>
                    The RealTime option will allow you to trade securities in real-time
                    The layout will be different as you will not have the simulation controller available to you
                    Only available during normal market hours from 9:30am to 4pm est 
                    If you are trying to repeat today's trade after trading has ended, please set the startDate and the EndDate equal to each other
                  </p>
                </div> */}
                Realtime-Trading: <input
                  type="checkbox" />
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
                Additional settings:
                {!showAdditionalSettings ? 
                    <ArrowDropDownIcon onClick={toggleAdditionalSettings} /> : <ArrowRightIcon onClick={toggleAdditionalSettings} />
                }
                </div>
                    {showAdditionalSettings &&
                      <>
                        <div>
                          TimeFrame: <select value={timeframe} onChange={handleTimeframe}>
                            <option value="1min">1 minute</option>
                            <option value="5min">5 minutes</option>
                            <option value="10min">10 minutes</option>
                            <option value="30min">30 minutes</option>
                            <option value="1hr">1 hour</option>
                            <option value="1d">1d (default)</option>
                            <option value="1w">1w</option>
                            <option value="1w">1m</option>
                            <option value="1w">3m</option>
                            <option value="1yr">1yr</option>
                          </select>
                        </div>
                        <div className="realtime-checkbox">
                          Enable Bid-Ask Spread: <input type="checkbox" />
                        </div>
                        <div className="realtime-checkbox">
                          Enable Exotic Financial Derivatives (e.g. options, futures, swaps, etc): <input type="checkbox" />
                        </div>
                      </>
                    }
              <button>Start Trading Simulator</button>
            </form>
          </div>
        </div>
      }

      {startSimulation && 
        <div className="homepage-portfolio">
          <Stats /> 
          <div className="homepage-portfolio-main">
            <PortfolioChart />
            <WatchList />
          </div>
          <div className="controller-buttons">
            <PlayArrowIcon/><button onClick={forwardSimDay}>Forward Day</button>
            <FastForwardIcon /><button onClick={forwardSimMonth}>Forward Month</button>
            <ReplayIcon /><button onClick={backwardSimDay}>Backward</button>
            <FastRewindIcon /><button onClick={backwardSimMonth}>Backward Month</button>
            <ReplayIcon /><button onClick={resetSimDay}>Reset</button>
            <SaveAltIcon /><button onClick={saveSim}>Save Simulation</button>
            <CancelIcon /><button onClick={stopSim}>Stop Simulation</button>
          </div>
        </div>
      }
      </div>
    </>
  )
}

export default Homepage