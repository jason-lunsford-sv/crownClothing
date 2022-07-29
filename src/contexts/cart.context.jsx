import { createContext, useState , useEffect} from 'react';

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
    const [ isCartOpen, setIsCartOpen ] = useState();
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState();

    useEffect(() => {
        const count = cartItems.reduce((total, nextValue) => { return total + nextValue.quantity }, 0);

        setCartCount(count);
    }, [cartItems]);

    const addItemToCart = product => {
        setCartItems(addCartItem(cartItems, product))
    };

    const value = {
        addItemToCart,
        cartItems,
        isCartOpen,
        setIsCartOpen,
        cartCount
    };

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    );
};