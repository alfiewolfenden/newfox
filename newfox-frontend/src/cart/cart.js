import React from 'react';
import CartItemList from './components/CartItemList';

import './cart.css'

const Cart = () => {
    return (
        <div className="cart__container">
            <h2>Cart</h2>
            <CartItemList />
            <h3>Total: $750</h3>
            <div>
                <p>Escompte de 5 % en cas de paiement comptant</p>
                <p>Beer Drop juillet 2020 #4 - Possibilité de panacher les brasseries</p>
                <p>*49€ ht frais de port sur Paris</p>
                <p>*Hors Paris 99€ ht frais de port - 2ème palette 49€ ht</p>
            </div>
        </div>
    );
};

export default Cart;