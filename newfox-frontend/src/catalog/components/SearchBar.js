import React from 'react';
import TextField from '@material-ui/core/TextField';

import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchbar__main">
            <TextField id="search-bar" label="Search..." />
        </div>
    );
}


export default SearchBar;