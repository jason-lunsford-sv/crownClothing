import { createContext, useReducer} from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, itemToAdd) => {
    const existingCartItem = cartItems.find(
        item => item.id === itemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem => {
            if (cartItem.id === itemToAdd.id) {
                return {...cartItem, quantity: cartItem.quantity + 1}
            } else {
                return cartItem;
            }
        });
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, itemToRemove) => {
    if (itemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    }

    cartItems.forEach(cartItem => {
        if (cartItem.id === itemToRemove.id) {
            cartItem.quantity = cartItem.quantity - 1;
        }
    });

    return [...cartItems];
};

const deleteCartItem = (cartItems, itemToDelete) => {
    return cartItems.filter(cartItem => cartItem.id !== itemToDelete.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTIONS_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTIONS_TYPES.SET_CART_ITEMS :
            return {
                ...state,
                ...payload
            }
        case CART_ACTIONS_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({
    children
}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCartItemsReducer = newCartItems => {
        const count = newCartItems.reduce((total, nextValue) => { return total + nextValue.quantity }, 0);
        const total = newCartItems.reduce((total, nextValue) => { return total + (nextValue.price * nextValue.quantity) }, 0);

        const payload = {
            cartItems: newCartItems,
            cartCount: count,
            cartTotal: total
        }

        dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, payload));
    }

    const setIsCartOpen = () => {
        dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_OPEN))
    }

    const addItemToCart = item => {
        const newCartItems = addCartItem(cartItems, item);

        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = item => {
        const newCartItems = removeCartItem(cartItems, item);

        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = item => {
        const newCartItems = deleteCartItem(cartItems, item);

        updateCartItemsReducer(newCartItems);
    }

    const value = {
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    );
};