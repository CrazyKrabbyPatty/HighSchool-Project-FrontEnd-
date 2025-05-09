import React from 'react';
import classes from './ProductCard.module.css';
import star_img from "./Source/star.svg"
import comments_img from "./Source/comments.svg"

const ProductCard = (props) => {

    return (
        <div className={classes.card} key={props.id}>
            <img src={props.image} className={classes.image} />
            <div className={classes.information}>
                <p className={classes.cost}>
                    {props.cost} руб.
                </p>
                <p className={classes.product_name}>
                    {props.name}
                </p>
                <div className={classes.information_sub}>
                    <img src={star_img} className={classes.small_ico}/>
                    <p>{props.rating}</p>
                    <img src={comments_img} className={classes.small_ico}/>
                    <p>{props.num_com}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;