import React, { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../shared/hooks/http-hook';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import LoadingSpinner from '../shared/uielements/LoadingSpinner';
import ErrorModal from '../shared/uielements/ErrorModal';
import { AuthContext } from '../shared/context/auth-context';
import './catalog.css'

const Catalog = () => {
    const auth = useContext(AuthContext);
    const [breweryList, setBreweryList] = useState();
    const [beerList, setBeerList] = useState();
    const [searchedBeerList, setSearchedBeerList] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const requestItemData = async () => {
            try {
                const breweryData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/breweries');
                setBreweryList(breweryData.breweries);
                const beerData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/breweries/beers/${auth.userId}`);
                setBeerList(beerData.beers);
            } catch (error) { }
        };
        requestItemData();
    }, [sendRequest, auth.userId])

    const updateSearchList = (newArray) => {
        setSearchedBeerList(newArray);
    };

    return (
        <div className="catalog__container">
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && !breweryList && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {breweryList && <ItemList data={breweryList} item="brewery" />}
            {beerList && <SearchBar data={beerList} onChange={updateSearchList} />}
            {isLoading && !beerList && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {searchedBeerList && <ItemList data={searchedBeerList} item="beer" />}
        </div>
    );

};

export default Catalog;