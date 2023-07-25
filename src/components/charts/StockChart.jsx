import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import "../../styles/StockChart.css"
import TSLA from "../../assets/TSLA.json"

import { simulationContext } from "../../Dashboard";

function StockChart({stock, setStock}) {

  const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);

  const [chart, setChart] = useState([]);
  const chartData = []
  const [note, setNote] = useState('');
  let dataMax = 0;
// ${ import.meta.env.ALPHA_VANTAGE_API }
  const fetchChart = async () => {

    // await axios
    //   .get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${search}&apikey=W3KQYEE0F4RZLOGP`)
    //   .then(({ data }) => {
    //     if (data["Monthly Time Series"]) {
    //       for (const key in data["Monthly Time Series"]) {
    //         const value = parseFloat(data["Monthly Time Series"][key]["4. close"]);
    //         chartData.push({ "name": key, "value": value });
    //         if (value > dataMax) {
    //           dataMax = value;
    //         }
    //       }
    //       setNote("");
    //     }
    //     else if (data.Note) {
    //       setNote(data.Note)
    //     }
    //     setChart(chartData.reverse());
    //   })
    
    const data = TSLA; 

      if (data["Monthly Time Series"]) {
          for (const key in data["Monthly Time Series"]) {
            const value = parseFloat(data["Monthly Time Series"][key]["4. close"]);
            chartData.push({ "name": key, "value": value });
            if (value > dataMax) {
              dataMax = value;
            }
          }
          setNote("");
        }
        else if (data.Note) {
          setNote(data.Note)
      }
      let filteredData = chartData.filter((entry) => (entry.name >= startDate && entry.name <= currentDate));
      // You can reverse the data here, if needed
      filteredData = filteredData.reverse();

      setChart(filteredData);
  };

  useEffect(() => {
    console.log("run")
    fetchChart();
  }, [stock]);

  return (
    <div className="chart">
      {note && <div>
        <p style={{ color: 'red', textAlign: 'center', margin: '0 5px' }}>{note}</p>
      </div>}
      <ResponsiveContainer className="chart" width="100%" height={600}>
        <AreaChart
          width={500}
          height={200}
          data={chart}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="value" type="number" domain={[0, "dataMax"]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
          <Brush />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StockChart;