import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';

const SearchBar = props => {
    const [newArray, setNewArray] = useState();
    const { data, onChange } = props;

    const filterFunction = (beer, input) => {
        if (
            beer.name.toLowerCase().includes(input) ||
            beer.style.toLowerCase() === input ||
            beer.brewery.toLowerCase() === input
        ) return true;
    };

    const setNewArrayHandler = useCallback(event => {
        setNewArray([...data].filter(beer => filterFunction(beer, event.target.value.toLowerCase())));
    }, [data]);

    useEffect(() => {
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('keyup', setNewArrayHandler);
    }, [setNewArrayHandler]);

    useEffect(() => {
        onChange(newArray);
    }, [newArray, onChange]);

    return (
        <div className="searchbar__main">
            <div className="searchbar__field">
                <TextField fullWidth id="search-bar" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} variant="outlined" placeholder="Search..." onKeyUp={setNewArrayHandler} />
            </div>
        </div>
    );
}


export default SearchBar;