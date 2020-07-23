import React from 'react';

import './BreweryItem.css'

const BreweryItem = props => {
    return (
        <div className="breweryitem__image-container">
            <img src={props.url} alt={props.alt} />
        </div>
    );
};

export default BreweryItem;