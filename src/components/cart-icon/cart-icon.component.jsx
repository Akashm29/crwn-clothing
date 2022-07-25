import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const { cartCount, isCartOpen, setIsOpen } = useContext(CartContext);
    const toggleCartOpen = () => setIsOpen(!isCartOpen)

    return (
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;