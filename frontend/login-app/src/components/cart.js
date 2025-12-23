import React, { useState, useEffect } from 'react';
import "./Cart.css";
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [deliveryCharges] = useState(50);
  const [gstPercentage] = useState(18);
  const [cgstPercentage] = useState(9);
  const [taxPercentage] = useState(5);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    calculateTotalBill(items);
  }, []);

  const calculateTotalBill = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.total;
    });

    const gstAmount = (total * gstPercentage) / 100;
    const cgstAmount = (total * cgstPercentage) / 100;
    const taxAmount = (total * taxPercentage) / 100;

    const totalAmount = total + deliveryCharges + gstAmount + cgstAmount + taxAmount;
    setTotalBill(totalAmount);
  };

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalBill(0);
  };

  const removeItem = (name) => {
    const updatedItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    calculateTotalBill(updatedItems);
  };

  const incrementQuantity = (name) => {
    const updatedItems = cartItems.map(item => {
      if (item.name === name) {
        item.quantity += 1;
        item.total = item.quantity * item.price;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    calculateTotalBill(updatedItems);
  };

  const decrementQuantity = (name) => {
    const updatedItems = cartItems.map(item => {
      if (item.name === name && item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.quantity * item.price;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    calculateTotalBill(updatedItems);
  };

  const placeOrder = async () => {
    const orderData = {
      name: 'Abhinav Wandhe',
      email: 'abhinavwandhe@gmail.com',
      contact: '+917666709264',
      totalAmount: totalBill,
      items: cartItems
    };

    try {
      const response = await axios.post('http://localhost:3000/place-order', orderData);
      alert('Order placed successfully! Order ID: ' + response.data.orderId);
      localStorage.removeItem('cart');
      setCartItems([]);
      setTotalBill(0);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div id="cart-items">
        {cartItems.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <div className="quantity-control">
              <button className="quantity-btn decrement-btn" onClick={() => decrementQuantity(item.name)}>-</button>
              <span className="item-count">{item.quantity}</span>
              <button className="quantity-btn increment-btn" onClick={() => incrementQuantity(item.name)}>+</button>
            </div>
            <p>Total Price: {item.total}</p>
            <button onClick={() => removeItem(item.name)}>Remove</button>
          </div>
        ))}
      </div>

      <div id="total-bill">
        <p>Total Bill: ₹{(totalBill - deliveryCharges - (totalBill * gstPercentage) / 100 - (totalBill * cgstPercentage) / 100 - (totalBill * taxPercentage) / 100).toFixed(2)}</p>
        <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
        <p>GST ({gstPercentage}%): ₹{((totalBill - deliveryCharges) * gstPercentage / 100).toFixed(2)}</p>
        <p>CGST ({cgstPercentage}%): ₹{((totalBill - deliveryCharges) * cgstPercentage / 100).toFixed(2)}</p>
        <p>Tax ({taxPercentage}%): ₹{((totalBill - deliveryCharges) * taxPercentage / 100).toFixed(2)}</p>
        <p><strong>Grand Total: ₹{totalBill.toFixed(2)}</strong></p>
      </div>

      <button onClick={emptyCart}>Empty Cart</button>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
