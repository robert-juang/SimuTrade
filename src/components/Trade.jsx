import React, { useState, useEffect, useContext } from 'react'
import "../styles/Trade.css"
import finnhub from 'https://cdn.skypack.dev/finnhub';
import StockChart from "./charts/StockChart"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import stocks from "../assets/stocks.json";
import Select from 'react-select'

import { simulationContext } from "../Dashboard";
import { TradeObject, StocksObject } from "../logic/stock.ts"

const options = [
    { value: true, label: 'Buy' },
    { value: false, label: 'Sell' },
]

function Trade() {
    //keep track of simulation context
    const { startSimulation, setStartSimulation, portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, isRealtime, setIsRealtime, stockList, setStockList } = useContext(simulationContext);

    //keep track if the stock has been searched 
    const [hasSearched, setHasSearched] = useState("");
    const [search, setSearch] = useState('');

    //user action, buy amount, and price
    const [action, setAction] = useState(true); //true means buy false means sell  
    const [amount, setAmount] = useState(0);
    const [stockPrice, setStockPrice] = useState(100);
    const [submittedOrder, setSubmittedOrder] = useState(false);

    //for search bar
    const OPTIONS_LIMIT = 10;
    const defaultFilterOptions = createFilterOptions();
    let bestMatches = [];
    const [matches, setMatches] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [inputText, setInputText] = useState('');
    const [textFieldLabel, setTextFieldLabel] = useState('Search');

    const filterOptions = (options, state) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }

    function handleSearch(e) {
        e.preventDefault(); 
        if (search !== "")
            setHasSearched(true);
        // results.push({"name": "Google", "ticker": "$10"})
    }

    function handleAction(e) {
        console.log(e)
        setAction(e.value);
    }

    function handleAmount(e) {
        setAmount(e.target.value);
    }

    function handleStockPrice(e) {
        setStockPrice(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedOrder(true);

        //TODO: fill in and update the currentStock Price 
        const newObj = new TradeObject(search, 100, stockPrice, amount, action ? "Buy" : "Sell");

        //adjust portfolio 
        console.log(portfolio) 
        if (action){
            setPortfolio(portfolio - newObj.totalCost)
        }
        else{
            setPortfolio(portfolio + newObj.totalCost)
        }
        
        stockList.addTrades(newObj);
        stockList.combine();


    }

    const searchStocks = async () => {
        // console.log(finnhub)
        // TODO: Make a call to the backend here orelse it throws error 
        // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        // api_key.apiKey = import.meta.env.VITE_API_KEY_FINNHUB;
        // const finnhubClient = new finnhub.DefaultApi()

        // await finnhubClient.symbolSearch(search, (error, data, response) => {
        //     console.log(data)
        // });
    }

    useEffect(() => {
        searchStocks();
        console.log("serached")
    }, []);

    return (
        <div>
            {startSimulation ?
                <div className="trademenu">
                    <form className="search" onSubmit={handleSearch}>
                        {/* <input type="text" className="search-stock" name="search" value={search} placeholder="Enter a stock name" onChange={handleInputChange}/>  */}
                        <Autocomplete
                            className="nav__search"
                            PaperComponent={({ children }) => (
                                <Paper style={{ background: '#02a4a4', color: 'white' }}>{children}</Paper>
                            )}
                            filterOptions={filterOptions}
                            disablePortal
                            id='stock_search'
                            getOptionLabel={(stocks) => `${stocks.symbol}`}
                            options={stocks}
                            onChange={(event, newValue) => {
                                if (newValue && newValue.symbol) {
                                    setSearch(newValue.symbol);
                                    // console.log(newValue["1. symbol"])
                                }
                            }}
                            inputValue={inputText}
                            onInputChange={(event, newInputValue) => {
                                setInputText(newInputValue);
                                if (newInputValue) {
                                    setKeyword(newInputValue)
                                }
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option.symbol === value.symbol
                            }
                            noOptionsText={"Please Make Sure That The Stock Name is Valid"}
                            renderOption={(props, stocks) => (
                                <Box style={{ display: 'flex', justifyContent: 'space-between' }} component="li" {...props} >
                                    <div>{stocks.symbol}</div>
                                    <div>{stocks.name}</div>
                                </Box>
                            )}
                            style={{ backgroundColor: "pink !important" }}
                            renderInput={(params) => <TextField
                                {...params} label={textFieldLabel} variant="outlined"
                                onFocus={() => setTextFieldLabel("")}
                                onBlur={() => setTextFieldLabel("Search")}
                            />}
                        >
                        </Autocomplete>
                    </form>

                    {hasSearched &&
                        <div className="search-main">
                            <StockChart stock={search} setStock={setSearch} />
                            <div className="container">
                                <div className="trade">
                                    <div className="trade-title">
                                        {action ? "Buy" : "Sell"} {search}
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="buy-sell">
                                            {/* Buy/Sell: <select value={action} onChange={handleAction}>
                                    <option value={"Buy"}>buy</option>
                                    <option value={"Sell"}>sell</option>
                                </select> */}
                                            Buy/Sell: <Select
                                                defaultValue={true}
                                                onChange={handleAction}
                                                options={options}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 10,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'grey',
                                                        primary: 'black',
                                                    },
                                                })} />
                                        </div>
                                        <div>
                                            Current Price: Connect to API
                                        </div>
                                        <div>
                                            Shares: <input type="number" value={amount} onChange={handleAmount}></input>
                                        </div>
                                        <div>
                                            {action ? "Buy" : "Sell"} Price: <input type="number" value={stockPrice} onChange={handleStockPrice}></input>
                                        </div>
                                        <div>
                                            Current Time: {currentDate}
                                        </div>
                                        <button>Submit Order</button>
                                    </form>
                                    {submittedOrder &&
                                        <div>Trade Placed!</div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                : <div></div>}
        </div>
    )
}

export default Trade