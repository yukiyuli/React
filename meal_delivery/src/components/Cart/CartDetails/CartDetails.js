import React, { useContext, useState} from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './CartDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../store/cart-context'
import Meal from '../../Meals/Meal/Meal'
import Confirm from '../../UI/Confirm/Confirm'

const CartDetails = () => {

  const ctx = useContext(CartContext)

  // set state to control confirm message box
  const [showConfirm, setShowConfirm] = useState(false)

  // add confrim function
  const showConfirmHandler = () => {
    setShowConfirm(true)
  }

  const cancelHandler = (e) => {
    e.stopPropagation()
    setShowConfirm(false)
  }

  const okHandler = () => {
    // empty cart
    ctx.cartDispatch({type:'CLEAR'});
  }

  return (

    <Backdrop>

      {showConfirm && <Confirm
        onOk={okHandler}
        onCancel={cancelHandler}       
        confirmText={'Are you sure to delete all?'} />}

      <div
        className={classes.CartDetails}
        onClick={e => e.stopPropagation()}>

        <header className={classes.Header}>
          <h2 className={classes.Title}>Item details</h2>
          <div
            onClick={showConfirmHandler}
            className={classes.Clear}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Empty cart</span>

          </div>
        </header>

        <div className={classes.MealList}>
          {
            ctx.items.map(item =>
              <Meal noDesc key={item.id} meal={item} />
            )
          }

        </div>
      </div>
    </Backdrop>

  )
}

export default CartDetails