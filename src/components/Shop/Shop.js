import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import { Link } from "react-router-dom";

const Shop = () => {

  // const { products, count } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const pages = Math.ceil(count / size);
  console.log(pages,'sdds')

useEffect(()=>{
  const url = `http://localhost:5000/products?page=${page}&size=${size}`

   fetch(url)
  .then(res => res.json())
  .then(data => {
    setProducts(data.products);
    setCount(data.count)
  })

}, [page, size])


  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    const ids = Object.keys(storedCart);
    console.log(ids);
    fetch('http://localhost:5000/productsByIds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids)
    })
    .then(res => res.json())
    .then(data => {
      console.log('pg',data)
        for (const id in storedCart) {
      const addedProduct = data.find((product) => product._id === id);
      console.log(addedProduct);
      if (addedProduct) {
        addedProduct.quantity = storedCart[id];
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
    })
  
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const restProduct = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity += 1;
      newCart = [...restProduct, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}>
          <br />
          <Link to="/orders">Review Orders</Link>
        </Cart>
      </div>
      <div className="pagination">
        <p>Currently selected page: {page}</p>
        {
        [...Array(pages).keys()].map((number) => (
          <button
            className={page === number ? 'selected' : ''}
            onClick={() => setPage(number)}
            key={number}
          >
            {number + 1}
          </button>
        ))
        }
        <select onChange={event => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
