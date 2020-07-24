import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import './SearchBar.css';

const SearchBar = props => {
    const [newArray, setNewArray] = useState();
    const { data, onChange } = props;

    const filterFunction = (beer, input) => {
        if (
            beer.name.toLowerCase().includes(input) ||
            beer.brewery.toLowerCase() === input ||
            beer.style.toLowerCase() === input
        ) return true;
    };

    const setNewArrayHandler = event => {
        setNewArray([...data].filter(beer => filterFunction(beer, event.target.value.toLowerCase())));
    };

    useEffect(() => {
        onChange(newArray);
    }, [newArray, onChange])

    return (
        <div className="searchbar__main">
            <div className="searchbar__field">
                <TextField fullWidth id="search-bar" label="Search..." onKeyUp={setNewArrayHandler} />
            </div>
        </div>
    );
}


export default SearchBar;