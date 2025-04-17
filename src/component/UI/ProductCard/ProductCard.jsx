import React from 'react';
import classes from './ProductCard.module.css';

const ProductCard = () => {

    return (
        <div className={classes.card}>
            <img src="#"/>
            <p>137 руб</p>
            <p>Бальзами для губ увлажняющий NIVEA</p>
            <div>
                <img src="#"/>
                <p></p>
                <img src="#"/>
                <p></p>
            </div>
        </div>
    );
};

export default ProductCard;