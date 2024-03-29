import React from 'react'
import classes from "./Meal.module.css"
import Counter from "../../UI/Counter/Counter";

/* 
meal component
*/
const Meal = (props) => {
    return (
        <div className={classes.Meal}>
            <div className={classes.ImgBox}>
                <img src={props.meal.img} />
            </div>
            <div className={classes.MealContent}>
                <h2 className={classes.Title}>{props.meal.title}</h2>
                {props.noDesc ? null : <p className={classes.Desc}>{props.meal.desc}</p>}
                <div className={classes.PriceAmount}>
                    <span className={classes.Price}>{props.meal.price}</span>
                    <Counter

                        meal={props.meal}
                    />
                </div>
            </div>
        </div>
    );
};

export default Meal;