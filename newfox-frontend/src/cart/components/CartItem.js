import React, { useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './CartItem.css'

const CartItem = props => {
    const { id, img, name, abv, qty, qqty, size, price, tprice } = props;
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

    const deleteItemHandler = async () => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/cart/${id}`,
                'DELETE',
                null,
                { Authorization: `Bearer ${auth.token}` }
            );
        } catch (err) { console.log(err); }
        props.onDelete(id, tprice);
    };

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
                        {`${qqty}x${size} @${price}€`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`${tprice}€`}
                    </Typography>
                    <div className="cartitem__x" id={id} onClick={deleteItemHandler}>
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