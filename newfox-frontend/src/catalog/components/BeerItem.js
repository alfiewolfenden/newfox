import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Modal from '../../shared/uielements/Modal';
import Button from '../../shared/formelements/Button';
import './BeerItem.css'

const BeerItem = props => {
    const { name, url, size, style, abv, price } = props
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const showDescriptionModalHandler = () => {
        setShowDescriptionModal(!showDescriptionModal);
    };

    return (
        <React.Fragment>
            <Modal
                show={showDescriptionModal}
                onCancel={showDescriptionModalHandler}
                header={`${name} ${abv}%`}
            >
                <div className="beeritem__modal-content">
                    <div className="beeritem__modal-image">
                        <img src={url} alt={name} />
                    </div>
                    <div className="beeritem__modal-text">
                        <h3>Description:</h3>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                        <Typography variant="caption" color="textSecondary">
                            {style}{' '}{abv}{'%'}
                        </Typography>
                        <Typography variant="body2">
                            {size}{' ⇒ '}{price}
                        </Typography>
                    </div>
                </div>
                <div className="beeritem__modal-buttons">
                    <Button>add to Cart</Button>
                </div>

            </Modal>
            <div
                className="beeritem__image-container"
                onClick={showDescriptionModalHandler}
            >
                <img src={url} alt={name} />
                <span>{name}</span>
                <Typography variant="caption" color="textSecondary" align="center">
                    {style}{' '}{abv}{'%'}
                </Typography>
                <Typography variant="body2" align="center">
                    {size}{' ⇒ '}{price}
                </Typography>
            </div>
        </React.Fragment>
    );
};

export default BeerItem;