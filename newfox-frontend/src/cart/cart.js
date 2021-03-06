import React, { useEffect, useState, useContext, useCallback } from 'react';

import CartItemList from './components/CartItemList';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import LoadingSpinner from '../shared/uielements/LoadingSpinner';
import ErrorModal from '../shared/uielements/ErrorModal';

import './cart.css'

const Cart = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [cartItemListData, setCartItemListData] = useState();
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const requestItemData = async () => {
            try {
                const cartData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/cart',
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                );
                setCartItemListData(cartData.cartItems);
                setCartTotalPrice(() => {
                    let tPrice = 0;
                    cartData.cartItems.forEach(item => tPrice += item.tprice);
                    return tPrice;
                })
            } catch (error) { }
        };
        requestItemData();
    }, [sendRequest, auth.token])

    const itemDeletedHandler = (deletedItemId, deletedItemPrice) => {
        setCartItemListData(prevItems => prevItems.filter(i => i.id !== deletedItemId));
        setCartTotalPrice(prevPrice => prevPrice - deletedItemPrice);
    };

    const priceChangeHandler = useCallback((priceChange) => {
        setCartTotalPrice(prevPrice => prevPrice + priceChange);
    }, []);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="cart__container">
                <h2>Cart</h2>
                {cartItemListData && cartItemListData.length === 0 && <h3>Your cart is empty!</h3>}
                {!isLoading && cartItemListData ? <CartItemList data={cartItemListData} onDeleteItem={itemDeletedHandler} onPriceChange={priceChangeHandler} /> : <LoadingSpinner />}
                <h3>Total: {cartTotalPrice.toFixed(2)}€</h3>
                <div>
                    <p>Escompte de 5 % en cas de paiement comptant</p>
                    <p>Beer Drop juillet 2020 #4 - Possibilité de panacher les brasseries</p>
                    <p>*49€ ht frais de port sur Paris</p>
                    <p>*Hors Paris 99€ ht frais de port - 2ème palette 49€ ht</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Cart;