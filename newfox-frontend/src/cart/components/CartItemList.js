import React from 'react';
import CartItem from './CartItem';

const CartItemList = props => {

    const cartData = props.data;
    console.log(cartData);

    return (
        <div className="cartitemlist__container">
            {cartData.map(cartitem => (
                <CartItem key={cartitem.id} img={cartitem.beer.image} name={cartitem.beer.name} abv={cartitem.beer.abv} qty={cartitem.qty} qqty={cartitem.beer.qqty} size={cartitem.beer.size} price={cartitem.beer.price} tprice={cartitem.beer.tprice} />
            ))}
        </div>
    );
};

export default CartItemList;