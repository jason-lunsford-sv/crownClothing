import { CART_ACTIONS_TYPES } from "./cart.types";
import { createAction } from '../../utils/reducer/reducer.utils'

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

export const setCartOpen = () => {
    return createAction(CART_ACTIONS_TYPES.SET_CART_OPEN);
}

export const addItemToCart = (cartItems, item) => {
    const newCartItems = addCartItem(cartItems, item);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
    const newCartItems = removeCartItem(cartItems, item);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, item) => {
    const newCartItems = deleteCartItem(cartItems, item);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
}