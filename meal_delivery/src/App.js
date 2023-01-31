import React, { useState, useSyncExternalStore } from 'react'
import Cart from './components/Cart/Cart';
import FilterMeals from './components/FilterMeals/FilterMeals';
import Meals from './components/Meals/Meals'
import CartContext from './store/cart-context';


// create a set of food data
const MEALS_DATA = [
  {
    id: '1',
    title: 'Hamburger',
    desc: '100% Canadian beef burger, topped with tangy pickles, ketchup, mustard and the sweet bite of onion, all on a freshly toasted bun.',
    price: 12,
    img: '/img/meals/1.png'
  },
  {
    id: '2',
    title: 'Double Cheeseburger',
    desc: 'Two slice of melted processed cheddar cheese on a 100% Canadian beef patty with tangy pickles and onions, ketchup and mustard on a freshly-toasted bun.',
    price: 20,
    img: '/img/meals/2.png'
  },
  {
    id: '3',
    title: 'Big Mac',
    desc: 'Two 100% Canadian beef patties, special sauce, crisp lettuce, processed cheddar cheese, pickles and onions on a toasted sesame seed bun.',
    price: 24,
    img: '/img/meals/3.png'
  }, {
    id: '4',
    title: 'Spicy Habanero McChicken',
    desc: 'Golden crispy and spicy skin, tender and smooth chicken thigh meat, multiple flavors, to impress your discerning taste buds at once.',
    price: 21,
    img: '/img/meals/4.png'
  }, {
    id: '5',
    title: 'Grilled Chicken Burger',
    desc: 'The original boneless chicken steak is tender and juicy, paired with green fresh lettuce and fragrant roast chicken sauce.',
    price: 22,
    img: '/img/meals/5.png'
  }, {
    id: '6',
    title: 'McChicken',
    desc: 'Breaded seasoned chicken and crisp lettuce, topped with our Mayo-Style Sauce. Some ingredients are just meant to be together.',
    price: 14,
    img: '/img/meals/6.png'
  }, {
    id: '7',
    title: 'Cheeseburger',
    desc: 'A slice of melted processed cheddar cheese on a 100% Canadian beef patty with tangy pickles and onions, ketchup and mustard on a freshly-toasted bun.',
    price: 12,
    img: '/img/meals/7.png'
  }
];

const App = () => {

  // create state to save food list
  const [mealsData, setMealsData] = useState(MEALS_DATA);

  /* 
   create a state to save shopping cart data
    1. food []
    2. total amount
    3. total price
  */

  const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0
  });

  // create meals filter function
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(item => item.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    setMealsData(newMealsData);
  };

  // add food to cart
  const addItem = (meal) => {
    // meal, the food needs to be add to cart
    // shallow copy cart
    const newCart = { ...cartData };

    // determine if the cart already had the food
    if (newCart.items.indexOf(meal) === -1) {

      // add meal to cart
      newCart.items.push(meal);

      // change the amount
      meal.amount = 1;

    } else {
      meal.amount += 1;
    }

    // add total amount
    newCart.totalAmount += 1;

    // add total price
    newCart.totalPrice += meal.price;

    // reset cart
    setCartData(newCart)

  };


  // reduce the food amount
  const removeItem = (meal) => {

    // shallow copy cart
    const newCart = { ...cartData };

    // reduce the food amount
    meal.amount -= 1;

    // check if food amount is 0
    if (meal.amount === 0) {
      // remove the food from cart
      newCart.items.splice(newCart.items.indexOf(meal), 1);
    }

    // change the total price and total amount
    newCart.totalAmount -= 1;

    newCart.totalPrice -= meal.price;

    // reset cart
    setCartData(newCart)
  };

  const clearCart = () => {

    const newCart = {...cartData};
    // 将购物车中商品的数量清0
    newCart.items.forEach(item => delete item.amount);
    newCart.items = [];
    newCart.totalAmount = 0;
    newCart.totalPrice = 0;

    setCartData(newCart);
  };

  return (
    <CartContext.Provider value={{ ...cartData, addItem, removeItem, clearCart}}>
      <div>
        <FilterMeals onFilter={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />

      </div>

    </CartContext.Provider>


  );
};

export default App;


