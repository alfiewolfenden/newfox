import React from 'react';
import CartItem from './CartItem';

const CartItemList = props => {

    const cartData = props.data;

    return (
        <div className="cartitemlist__container">
            {cartData.map(cartitem => (
                <CartItem
                    key={cartitem.id}
                    id={cartitem.id}
                    img={cartitem.beer.image}
                    name={cartitem.beer.name}
                    abv={cartitem.beer.abv}
                    qty={cartitem.qty}
                    qqty={cartitem.beer.qqty}
                    size={cartitem.beer.size}
                    price={cartitem.beer.price}
                    tprice={cartitem.tprice}
                    onDelete={props.onDeleteItem}
                    />
            ))}
        </div>
    );
};

export default CartItemList;