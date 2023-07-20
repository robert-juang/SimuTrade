import React, {useState,useEffect,useContext} from 'react'
import "../styles/Trade.css"
import { Search } from '@mui/icons-material';
import finnhub from 'https://cdn.skypack.dev/finnhub';

import { simulationContext } from "../Dashboard";

function Trade() {
    const { startSimulation, setStartSimulation } = useContext(simulationContext);

    const [hasSearched, setHasSearched] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setSearch(e.target.value); 
    }

    function handleSearch(){
        setHasSearched(true); 
        // results.push({"name": "Google", "ticker": "$10"})
    }

    function handleSubmit(){
        console.log("Submitted"); 
    }


    const searchStocks = async () => {
        console.log(finnhub)
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
                <input type="text" className="search-stock" name="search" value={search} placeholder="Enter a stock name" onChange={handleInputChange}/> 
                <button onClick={handleSearch}>Submit</button>
            </div>

            <div>
                {results.map(result => (
                    <div key={result.id}>
                        {result.name} ({result.ticker})
                    </div>
                ))}
            </div>
            
            {hasSearched && 
            <div className="container">
                <div className="trade">
                    <div className="trade-title">
                        Buy {search}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            Buy amount: <input></input>
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
            }
        </div>
        : <div>Simulation Not Started</div>}
        </div>
    )
}

export default Trade