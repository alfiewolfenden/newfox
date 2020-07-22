import React from 'react';

import BreweryList from './components/BreweryList';
import SearchBar from './components/SearchBar';
import BeerList from './components/BeerList';

const Catalog = () => {

    return (
        <React.Fragment>
            <BreweryList />
            <SearchBar />
            <BeerList />
        </React.Fragment>
    );

};

export default Catalog;