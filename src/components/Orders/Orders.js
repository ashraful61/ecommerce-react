import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
    const { initialCart }= useLoaderData();
    const [cart, setCart] = useState(initialCart);;

    const handleRemoveProduct = (id) => {
        const remainingProducts = cart.filter(product => product.id !== id);
        setCart(remainingProducts);
        removeFromDb(id);
    }
    const clearCart = () => {
      setCart([])
      deleteShoppingCart()
    }

    return (
        <div className="shop-container">
        <div className="orders-container">
         {
            cart.map(product => <ReviewItem key={product.id} product={product} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
         }
         {
          !cart.length && <h2>No Items for review. Please <Link to='/'>Shop More </Link> </h2>
         }
        </div>
        <div className="cart-container">
          <Cart cart={cart} clearCart={clearCart}></Cart>
        </div>
      </div>
    );
};

export default Orders;