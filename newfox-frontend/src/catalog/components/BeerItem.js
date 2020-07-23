import React from 'react';

import './BeerItem.css'

const BeerItem = props => {
    return (
        <div className="beeritem__image-container">
            <img src={props.url} alt={props.alt} />
        </div>
    );
};

export default BeerItem;