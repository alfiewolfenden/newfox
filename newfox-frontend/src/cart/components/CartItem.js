import React, { useContext, useEffect, useState, useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './CartItem.css'

const CartItem = props => {
    const { onPriceChange, id, img, name, abv, qty, qqty, size, price, tprice } = props;
    const { sendRequest } = useHttpClient();
    const [selectQty, setSelectQty] = useState(qty);
    const [prevPrice, setPrevPrice] = useState(tprice);
    const [cartItemPrice, setCartItemPrice] = useState(tprice);
    const auth = useContext(AuthContext);
    const qtyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleChange = (event) => {
        setSelectQty(event.target.value);
    };

    const setPrevPriceHandler = useCallback((price) => {
        setPrevPrice(price);
    }, []);

    useEffect(() => {
        const updateItem = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/cart/${id}`,
                    'PATCH',
                    JSON.stringify({ newQty: selectQty }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                );
                setCartItemPrice(selectQty * qqty * price);
            } catch (err) {
                console.log(err);
            }
        };
        updateItem();
        onPriceChange((selectQty * qqty * price) - prevPrice);
        setPrevPriceHandler(selectQty * qqty * price);
    }, [sendRequest, id, selectQty, auth.token, qqty, price, onPriceChange, prevPrice, setPrevPriceHandler]);

    const deleteItemHandler = async () => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/cart/${id}`,
                'DELETE',
                null,
                { Authorization: `Bearer ${auth.token}` }
            );
        } catch (err) { console.log(err); }
        props.onDelete(id, cartItemPrice);
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
                <div className="cartitem__qty-selector">
                    <FormControl variant="outlined">
                        <InputLabel id="qty-select-outlined-label">Qty</InputLabel>
                        <Select
                            labelId="qty-select-outlined-label"
                            id="qty-select-outlined"
                            value={selectQty}
                            onChange={handleChange}
                            label="Qty"
                        >
                            {qtyArray.map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className="cartitem__details">
                    <Typography variant="body2" color="textSecondary">
                        {`${qqty}x${size} @${price}€`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`${cartItemPrice}€`}
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