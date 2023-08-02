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
    const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, isRealtime, setIsRealtime, stockList, setStockList, portfolioChart, setPortfolioChart } = useContext(simulationContext);

    const [chart, setChart] = useState([]);
    const chartData = []
    const [note, setNote] = useState('');
    let dataMax = 0;
    // const fetchPortfolio = async () => {
    //     const data = TSLA;
    //     if (data["Monthly Time Series"]) {
    //         for (const key in data["Monthly Time Series"]) {
    //             const value = parseFloat(data["Monthly Time Series"][key]["4. close"]);
    //             chartData.push({ "name": key, "value": value });
    //             if (value > dataMax) {
    //                 dataMax = value;
    //             }
    //         }
    //         setNote("");
    //     }
    //     else if (data.Note) {
    //         setNote(data.Note)
    //     }
    //     setChart(chartData.reverse());
    // };
    return (
        <div className="chart">
            <ResponsiveContainer id="port" className="chart" width="100%" height={700}>
                <AreaChart
                    width={800}
                    height={700}
                    data={portfolioChart}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="value" type="number" domain={[0, portfolio * 2]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
                    <Brush />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StockChart;