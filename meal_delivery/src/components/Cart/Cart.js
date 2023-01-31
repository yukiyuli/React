import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import iconImg from '../../assets/bag.png'
import CartContext from '../../store/cart-context'
import CartDetails from './CartDetails/CartDetails'
import Checkout from '../Cart/Checkout/Checkout'

const Cart = () => {

    const ctx = useContext(CartContext);

    // add a state to show details or not
    const [showDetails, setShowDetails] = useState(false);

    // add a state to show checkout interface or not
    const [showCheckOut, setShowCheckOut] = useState(false)

    // show details function
    const toggleDetailsHandler = () => {
        if(ctx.totalAmount === 0) {
            setShowDetails(false);
            return;
        };
        setShowDetails(prevState => !prevState);
    };

    const showCheckoutHandler = () => {
        if(ctx.totalAmount === 0) return;
        setShowCheckOut(true);
    };

    const hideCheckoutHandler = () => {
        setShowCheckOut(false)
    }

    return (
        <div className={classes.Cart} onClick={toggleDetailsHandler}>
            {showCheckOut && <Checkout onHide={hideCheckoutHandler} />}

            {/* import cart detail */}
            {showDetails && <CartDetails />}

            <div className={classes.Icon}>
                <img src={iconImg} />
                {ctx.totalAmount === 0 ? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}

            </div>

            {ctx.totalAmount === 0 ? <p className={classes.NoMeal}>no items</p> : <p className={classes.Price}>{ctx.totalPrice}</p>}
            <button
                onClick={showCheckoutHandler}
                className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled : ''}`}>Checkout</button>
        </div>
    );
};

export default Cart;