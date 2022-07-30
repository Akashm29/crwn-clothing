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

const clearCartItem = (cartItems, productToRemove) => {
    return [...cartItems].filter(cartItem => cartItem.id !== productToRemove.id)
}
const removeCartItem = (cartItems, productToRemove) => {
    // finds if cartItems contains productToRemove
    let cartCloneArray = [...cartItems];
    let isProductInCart = cartCloneArray.find(item => item.id === productToRemove.id);
    if (productToRemove.quantity === 1) {
        cartCloneArray = cartCloneArray.filter(item => item.id !== productToRemove.id)
    }
    return cartCloneArray.map(cartItem => cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    setCartItem: () => { },
    addItemToCart: () => { },
    removeItemToCart: () => { },
    cartCount: 0,
    setCartCount: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const cartItemCount = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
        setCartCount(cartItemCount)
    }, [cartItems]);

    // calculates totalCartCount (overall total price)
    useEffect(() => {
        const cartTotalCount = cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
        setCartTotal(cartTotalCount)
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        let modifiedCartItems = addCartItem(cartItems, productToAdd)
        setCartItem(modifiedCartItems)
    }
    const removeItemToCart = (productToRemove) => {
        let modifiedCartItems = removeCartItem(cartItems, productToRemove)
        setCartItem(modifiedCartItems)
    }
    const clearItemFromCart = (productToRemove) => {
        let modifiedCartItems = clearCartItem(cartItems, productToRemove)
        setCartItem(modifiedCartItems)
    }
    const value = { isCartOpen, cartItems, cartCount, cartTotal, setIsOpen, addItemToCart, removeItemToCart, clearItemFromCart }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}