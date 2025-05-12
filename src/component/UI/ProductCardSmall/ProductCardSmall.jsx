import classes from "./ProductCardSmall.module.css";

const ProductCardSmall = (props) => {
    return (
        <div className={classes.SmallCard} key={props.id}>
            <img src={props.image} alt={"Product Card"} className={classes.image}/>
            <div className={classes.text_placeholder}>
                <p className={classes.text_price}>{props.cost}</p>
                <p>{props.name}</p>
            </div>
        </div>
    );
};

export default ProductCardSmall;