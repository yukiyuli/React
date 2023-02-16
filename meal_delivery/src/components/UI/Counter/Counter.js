import React, { useContext } from 'react'
import classes from './Counter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../store/cart-context'


/* 

- import FontAwesome
  1. Add SVG Core
      npm i --save @fortawesome/fontawesome-svg-core
  2. Add Icon Packages
      # Free icons styles
      npm i --save @fortawesome/free-solid-svg-icons
      npm i --save @fortawesome/free-regular-svg-icons
  3. Add the React Component
      npm i --save @fortawesome/react-fontawesome@latest

- import component
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

- import icon
  import { faPlus } from '@fortawesome/free-solid-svg-icons'

*/


// counter component
const Counter = (props) => {

  const ctx = useContext(CartContext);

  // function of adding cart
  const addButtonHandler = () => {
    // ctx.addItem(props.meal);
    ctx.cartDispatch({type:'ADD', meal:props.meal});
  };

  // function of deleting food
  const subButtonHandler = () => {
    // ctx.removeItem(props.meal);
    ctx.cartDispatch({type:'REMOVE', meal:props.meal});
  };

  return (
    <div className={classes.Counter}>

      {/* if amount = 0, don't show number 0
             use Fragment to make button "-" and amount in one block
          
        */}
      {
        (props.meal.amount && props.meal.amount !== 0) ? (
          <>
            <button
              onClick={subButtonHandler}
              className={classes.Sub}><span><FontAwesomeIcon icon={faMinus} /></span></button>
            <span className={classes.Count}>{props.meal.amount}</span>
          </>
        ) : null
      }


      <button
        onClick={addButtonHandler}
        className={classes.Add}><FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default Counter