import React, { useState, useEffect } from 'react';

import { useHttpClient } from '../shared/hooks/http-hook';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import LoadingSpinner from '../shared/uielements/LoadingSpinner';
import ErrorModal from '../shared/uielements/ErrorModal';
import './catalog.css'

const Catalog = () => {
    const [breweryList, setBreweryList] = useState();
    const [beerList, setBeerList] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const requestItemData = async () => {
            try {
                const breweryData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/breweries');
                setBreweryList(breweryData.breweries);
                const beerData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/breweries/beers');
                setBeerList(beerData.beers);
            } catch (error) { }
        };
        requestItemData();
    }, [sendRequest])

    return (
        <div className="catalog__container">
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && !breweryList && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {breweryList && <ItemList data={breweryList} item="brewery" />}
            <SearchBar />
            {isLoading && !beerList && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {beerList && <ItemList data={beerList} item="beer" />}
        </div>
    );

};

export default Catalog;