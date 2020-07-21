import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';


const Input = props => {

    const [isError, setIsError] = useState(false);
    const { id, label, onInput } = props;
    const [inputValue, setInputValue] = useState('');

    const emailErrorHandler = (value) => {
        console.log(/^\S+@\S+\.\S+$/.test(value));
        return (
            /^\S+@\S+\.\S+$/.test(value)
        );
    };

    const passwordErrorHandler = (value) => {
        return (
            value.trim().length >= 6
        );
    };

    const onChangeHandler = event => {
        let val = event.target.value;
        setInputValue(val);
        errorToggleHandler(event.target.id, val)
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

    useEffect(() => {
        onInput(id, inputValue, isError)
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
            onChange={onChangeHandler}
            error={isError}
            helperText={isError && props.errorText}
        />
    )
};

export default Input;