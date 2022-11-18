import React from 'react';
import './Cart.css'

const Cart = ({cart, clearCart, children}) => {

    //Calculate total price in cart
    // let totalPrice = cart.reduce( (pre, current) => pre + current.price, 0)
    let total = 0;
    let shipping = 0;
    let quantity = 0;

    for (const product of cart) {
        quantity += product.quantity
        total += (product.price * product.quantity);
        shipping += product.shipping 
    }

    const tax = parseFloat((total * 0.1).toFixed(2))
    const grandTotal = total + shipping + tax

    return (
        <div className='cart'>
               <h3>Order Summary</h3>
               <p>Selected Items: {quantity}</p>
               <p>Total Price: ${total}</p>
               <p>Total Shipping: ${shipping} </p>
               <p>Tax: ${tax} </p>
               <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
               <button className='btn-clear-cart' onClick={clearCart}>Clear Cart</button>
               {
                 children
               }
        </div>
    );
};

export default Cart;