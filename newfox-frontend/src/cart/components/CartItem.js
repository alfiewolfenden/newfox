import React from 'react';
import Typography from '@material-ui/core/Typography';

import './CartItem.css'

const CartItem = props => {
    const { img, name, abv, qty, qqty, size, price, tprice } = props;
    return (
        <React.Fragment>
            <div className="cartitem__container">
                <div className="cartitem__beer">
                    <img className="cartitem__img" src={img} alt={name} />
                    <Typography variant="subtitle1">
                        {`${name} ${abv}%`}
                    </Typography>
                </div>
                <div>{qty}</div>
                <div className="cartitem__details">
                    <Typography variant="body2" color="textSecondary">
                        {`${qqty}x${size} @${price}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {tprice}
                    </Typography>
                    <div className="cartitem__x">
                        <Typography variant="h6">
                            {'X'}
                        </Typography>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CartItem;