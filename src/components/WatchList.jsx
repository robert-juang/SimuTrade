import React, { useState } from 'react';
import '../styles/WatchList.css';

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const WatchList = () => {
    const [search, setSearch] = useState('');
    const [watchlist, setWatchlist] = useState([]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAdd = () => {
        const stock = { name: search, price: 100 };
        setWatchlist([...watchlist, stock]);
        setSearch('');
    };

    const handleRemove = (stockToRemove) => {
        setWatchlist(watchlist.filter(stock => stock !== stockToRemove));
    };

    return (
        <div className="watchlist">
            <div className="trade-title">
                My Stock WatchList
            </div>
            <div className="watchlist-input">
                <input type="text" value={search} placeholder="Track Stocks" onChange={handleSearchChange} />
                <AddIcon onClick={handleAdd} />
            </div>
            {watchlist.map((stock, index) => (
                <div key={index} className="stock">
                    <span className="stock-name">{stock.name}</span>
                    <span className="stock-price">${stock.price}</span>
                    <ClearIcon id="mui-clear-icon" onClick={() => handleRemove(stock)} />
                </div>
            ))}
        </div>
    );
};

export default WatchList;
