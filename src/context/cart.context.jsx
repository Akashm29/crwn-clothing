import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // finds if cartItems contains ProductToAdd
    let cartCloneArray = [...cartItems];
    let isProductInCart = cartCloneArray.find(item => item.id === productToAdd.id);
    if (isProductInCart) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }
    // return new array with modified cartItems / new cart Item
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    setCartItem: () => { },
    addItemToCart: () => { },
    cartCount: 0,
    setCartCount: () => { }
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const cartItemCount = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
        setCartCount(cartItemCount)
    }, [cartItems])
    const addItemToCart = (productToAdd) => {
        let modifiedCartItems = addCartItem(cartItems, productToAdd)
        setCartItem(modifiedCartItems)
    }
    const value = { isCartOpen, cartItems, cartCount, setIsOpen, addItemToCart }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}