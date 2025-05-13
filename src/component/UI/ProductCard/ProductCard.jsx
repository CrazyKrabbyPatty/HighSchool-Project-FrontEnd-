import classes from './ProductCard.module.css';
import star_img from "./Source/star.svg"
import comments_img from "./Source/comments.svg"

const ProductCard = (props) => {

    return (
        <div className={classes.card} key={props.id}>
            <img src={props.image} className={classes.image} />
            <div className={classes.information}>
                <p className={classes.cost}>
                    {props.cost} ₽
                </p>
                <p className={classes.product_name}>
                    {props.name}
                </p>
                <div className={classes.information_sub}>
                    <div className={classes.comments_rating}>
                        <img src={star_img} className={classes.small_ico}/>
                        <p >
                            {props.rating}
                        </p>
                    </div>
                    <div className={classes.comments_rating}>
                        <img src={comments_img} className={classes.small_ico}/>
                        <p className={classes.comments_text}>
                            {props.num_com} 166
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;