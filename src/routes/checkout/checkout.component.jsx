import React from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';
import './checkout.styles.scss'
const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems && cartItems.length ? cartItems.map((cartItem) => <CheckoutItem cartItem={cartItem} key={cartItem.id} />) :
                    <div>
                        <h2>No Item Available in cart</h2>
                        <p><span className="nav-link" onClick={() => navigate('/shop')}><b>Click here to start shopping...</b></span></p>
                    </div>
            }
            <span className='total'>Total: ${cartTotal}</span>
        </div >
    )
}

export default Checkout