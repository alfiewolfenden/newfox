import React from 'react';
import BreweryItem from './BreweryItem';
import BeerItem from './BeerItem';

import './ItemList.css'

const ItemList = props => {

    const listData = props.data;

    return (
        <div className="Itemlist__grid-container">
            {props.item === "brewery" &&
                listData.map(item => (
                    <BreweryItem key={item.id} url={item.image} alt={item.name} />
                ))
            }
            {props.item === "beer" &&
                listData.map(item => (
                    <BeerItem key={item.id} url={item.image} alt={item.name} />
                ))
            }
        </div>
    );
};

export default ItemList;