import React from 'react';

import './BreweryItem.css'

const BreweryItem = props => {

    const breweryQuery = () => {
        const searchBar = document.getElementById('search-bar');
        searchBar.focus();
        searchBar.value = props.alt;
        searchBar.dispatchEvent(new Event('keyup'));
    };

    return (
        <div className="breweryitem__image-container" onClick={breweryQuery}>
            <img src={props.url} alt={props.alt} />
        </div>
    );
};

export default BreweryItem;