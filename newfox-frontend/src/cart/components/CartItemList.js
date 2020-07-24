import React from 'react';
import CartItem from './CartItem';

const CartItemList = () => {
    const beerData = [
        {
            id: "12315",
            img: "https://broufox-fr.firebaseapp.com/data/images/tk_free_and_freaky-01s.png",
            name: "Free and Freaky",
            abv: 4.3,
            qty: 3,
            qqty: 12,
            size: "C440",
            price: 3.69,
            tprice: 132.84
        },
        {
            id: "12312",
            img: "https://broufox-fr.firebaseapp.com/data/images/tk_free_and_freaky-01s.png",
            name: "Free and Freaky",
            abv: 4.3,
            qty: 3,
            qqty: 12,
            size: "C440",
            price: 3.69,
            tprice: 132.84
        },
    ]

    return (
        <div className="cartitemlist__container">
            {beerData.map(beer => (
                <CartItem key={beer.id} img={beer.img} name={beer.name} abv={beer.abv} qty={beer.qty} qqty={beer.qqty} size={beer.size} price={beer.price} tprice={beer.tprice} />
            ))}
        </div>
    );
};

export default CartItemList;