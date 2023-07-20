import React, { useState, useContext } from 'react'
import "../styles/Homepage.css"
import PortfolioChart from "./PortfolioChart" 
import WatchList from './WatchList';
import Dashboard from './Stats'; 


import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { simulationContext } from "../Dashboard";

function Homepage() {
  const {startSimulation, setStartSimulation} = useContext(simulationContext);

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [startAmount, setStartAmount] = useState("");
  const [timeframe, setTimeframe] = useState(""); 

  const handleDateChange = (e) => {
    setDateStart(e.target.value);
  };

  const handleDateEnd = (e) =>{
    setDateEnd(e.target.value); 
  }

  const handleStartAmount = (e) => {
    setStartAmount(e.target.value);
  }

  const handleTimeframe = (e) =>{
    setTimeframe(e.target.value);
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

  function forwardSim() {
    console.log("forward")
  }

  function backwardSim() {
    console.log("backward")
  }

  function handleSubmit(e){
    e.preventDefault(); 
    if (!startSimulation){
      setStartSimulation(true); 
    }
    if (startAmount === ""){
      setStartAmount(100000);
    }

    console.log(dateStart);
    console.log(dateEnd); 
  }

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
                  min="1990-01-01"
                  max="2023-01-01"
                  value={dateStart}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                End Date: <input
                  type="date"
                  min="1990-01-01"
                  max="2023-01-01"
                  value={dateEnd}
                  onChange={handleDateEnd}
                />
              </div>
              <div>
                Realtime-Trading: <input
                  type="checkbox" />
              </div>
              <div>
                Start Balance: <input
                  type="number"
                  placeholder="Default: $100,000"
                  value={startAmount}
                  onChange={handleStartAmount}
                />
              </div>
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
              <div>
                Additional settings:
              </div>
              <button>Start Trading Simulator</button>
            </form>
          </div>
        </div>
      }

      {startSimulation && 
        <div className="homepage-portfolio">
          <Dashboard /> 
          <div className="homepage-portfolio-main">
            <PortfolioChart />
            <WatchList />
          </div>
          <div className="controller-buttons">
            Simulation Controller:
            <PlayArrowIcon/><button onClick={forwardSim}>Forward Day</button>
            <ReplayIcon /><button onClick={backwardSim}>Backward</button>
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