import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { addToDb, deleteShoppingCart, getStoredCart } from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const { products } = useLoaderData()
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // useEffect(() => {
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  const clearCart = () => {
    setCart([])
    deleteShoppingCart()
  }

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      console.log(addedProduct);
      if (addedProduct) {
        addedProduct.quantity = storedCart[id];
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find(product => product.id === selectedProduct.id)  
    if(!exists) {
         selectedProduct.quantity = 1
         newCart = [...cart, selectedProduct];
    }
    else {
      const restProduct = cart.filter(product => product.id !== selectedProduct.id)
      exists.quantity += 1
      newCart = [...restProduct, exists]
    }
 
    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}>
          <br/><Link to='/orders'>Review Orders</Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
