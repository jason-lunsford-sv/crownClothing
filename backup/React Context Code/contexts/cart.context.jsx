import { createContext, useState , useEffect} from 'react';

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

export const CartProvider = ({
    children
}) => {
    const [ isCartOpen, setIsCartOpen ] = useState();
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((total, nextValue) => { return total + nextValue.quantity }, 0);

        setCartCount(count);
    }, [cartItems]);

    useEffect(() => {
        const total = cartItems.reduce((total, nextValue) => { return total + (nextValue.price * nextValue.quantity) }, 0);

        setCartTotal(total);
    }, [cartItems]);

    const addItemToCart = item => {
        setCartItems(addCartItem(cartItems, item));
    };

    const removeItemFromCart = item => {
        setCartItems(removeCartItem(cartItems, item));
    };

    const deleteItemFromCart = item => {
        setCartItems(deleteCartItem(cartItems, item));
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