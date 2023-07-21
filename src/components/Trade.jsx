import React, {useState,useEffect,useContext} from 'react'
import "../styles/Trade.css"
import finnhub from 'https://cdn.skypack.dev/finnhub';
import StockChart from "./StockChart"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import stocks from "../assets/stocks.json";

import { simulationContext } from "../Dashboard";

function Trade() {
    //keep track of simulation context
    const { startSimulation, setStartSimulation } = useContext(simulationContext);

    //keep track if the stock has been searched 
    const [hasSearched, setHasSearched] = useState("");
    const [search, setSearch] = useState('');

    //user action, buy amount, and price
    const [action, setAction] = useState("Buy"); //true means buy false means sell  
    const [amount, setAmount] = useState(""); 
    const [stockPrice, setStockPrice] = useState(100); 

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

    function handleSearch(){
        setHasSearched(true); 
        setSearch(search) 
        // results.push({"name": "Google", "ticker": "$10"})
    }

    function handleAction(e) {
        setAction(e.target.value);
    }

    function handleSubmit(){
        console.log("Submitted"); 
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
    }, [search]);

    return (
        <div>
        {startSimulation ?
        <div className="trademenu">
            <div className="search">
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
                <button onClick={handleSearch}>Submit</button>
            </div>
            
            {hasSearched && 
            <div className="search-main">
                <StockChart stock={search}/>
                <div className="container">
                    <div className="trade">
                        <div className="trade-title">
                            {action} {search}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                Buy/Sell: <select value={action} onChange={handleAction}>
                                    <option value={"Buy"}>buy</option>
                                    <option value={"Sell"}>sell</option>
                                </select>
                            </div>
                            <div>
                                Amount: <input type="number"></input>
                            </div>
                            <div>
                                Buy Price: <input></input>
                            </div>
                            <div>
                                Current Time: 
                            </div>
                            <button>Review Order</button>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
        : <div>Simulation Not Started</div>}
        </div>
    )
}

export default Trade