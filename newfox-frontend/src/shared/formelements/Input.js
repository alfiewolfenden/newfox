import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';


const Input = props => {

    const { id, label, onInput } = props;
    const [isError, setIsError] = useState(true);
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const emailErrorHandler = (value) => {
        return (
            /^\S+@\S+\.\S+$/.test(value)
        );
    };

    const passwordErrorHandler = (value) => {
        return (
            value.trim().length >= 6
        );
    };

    const errorToggleHandler = (id, value) => {
        let err;
        switch (id) {
            case "email":
                err = setIsError(!emailErrorHandler(value));
                return err;
            case "password":
                err = setIsError(!passwordErrorHandler(value));
                return err;
            default:
                return null;
        }
    };

    const isTouchedHandler = () => {
        setIsTouched(true);
    };

    const onChangeHandler = event => {
        let val = event.target.value;
        setInputValue(val);
        errorToggleHandler(event.target.id, val)
    };

    useEffect(() => {
        onInput(id, inputValue, !isError)
    }, [id, inputValue, isError, onInput]);

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={id}
            label={label}
            type={id}
            autoFocus={id === "email"}
            onBlur={isTouchedHandler}
            onChange={onChangeHandler}
            error={isError && isTouched}
            helperText={isError && isTouched && props.errorText}
        />
    )
};

export default Input;