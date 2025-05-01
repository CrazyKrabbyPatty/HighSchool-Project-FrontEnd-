import React from 'react';
import classes from './ProductCard.module.css';
import star_img from "./Source/star.svg"
import comments_img from "./Source/comments.svg"

const ProductCard = (props) => {

    return (
        <div className={classes.card} key={props.id}>
            <img src={props.image}/>
            <p>{props.cost}</p>
            <p>{props.name}</p>
            <div>
                <img src={star_img}/>
                <p>{props.rating}</p>
                <img src={comments_img}/>
                <p>{props.num_com}</p>
            </div>
        </div>
    );
};

export default ProductCard;