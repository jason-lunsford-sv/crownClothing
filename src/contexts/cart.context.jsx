import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        item => item.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem => {
            if (cartItem.id === productToAdd.id) {
                return {...cartItem, quantity: cartItem.quantity + 1}
            } else {
                return cartItem;
            }
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

export const CartProvider = ({
    children
}) => {
    const [isCartOpen, setIsCartOpen] = useState();
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = product => {
        setCartItems(addCartItem(cartItems, product))
    };

    const value = {
        addItemToCart,
        cartItems,
        isCartOpen,
        setIsCartOpen
    };

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    );
};