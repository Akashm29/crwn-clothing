import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    console.log("cartItems", cartItems)
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems && cartItems.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id} />)}
            </div>
            <Button>Go To The Checkout</Button>
        </div>

    )
}

export default CartDropdown;