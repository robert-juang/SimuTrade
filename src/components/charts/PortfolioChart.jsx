
// import "../styles/PortfolioChart.css"
// import React, { useEffect, useState } from 'react';
// import { createChart } from 'lightweight-charts';



// const PortfolioChart = () => {

//     return (
//         <div>
//             more stuff
//         </div>
//     );
// };

// export default PortfolioChart;

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
import "../../styles/PortfolioChart.css"
import TSLA from "../../assets/TSLA.json"

import { simulationContext } from "../../Dashboard";

function StockChart() {
    const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);

    const [chart, setChart] = useState([]);
    const chartData = []
    const [note, setNote] = useState('');
    let dataMax = 0;
    // ${ import.meta.env.ALPHA_VANTAGE_API }
    const fetchPortfolio = async () => {
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
        setChart(chartData.reverse());
    };

    useEffect(() => {
        // This needs more testing 
        fetchPortfolio();
        // setChart(chartData.filter((entry) => (entry.name >= startDate)))
    }, []);

    return (
        <div className="chart">
            <ResponsiveContainer id="port" className="chart" width="100%" height={700}>
                <AreaChart
                    width={800}
                    height={700}
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