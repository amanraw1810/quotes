import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    cartTotalQty: 0,
};

// Select cart items from state
const selectCartItems = state => state.cart.cartItems;

// Selector to calculate total number of distinct items in cart
export const selectTotalCartItems = createSelector(
    selectCartItems,
    items => items.length
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, product_name, selectedSize, price, product_icon } = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === id && item.selectedSize === selectedSize);

            if (existingItemIndex !== -1) {
                // Item already exists, increase quantity
                state.cartItems[existingItemIndex].cartQuantity += 1;
                state.cartTotalQty += 1; // Increase total quantity
            } else {
                // Item does not exist, add it
                const newItem = { id, product_name, selectedSize, price, product_icon, cartQuantity: 1 };
                state.cartItems.push(newItem);
                state.cartTotalQty += 1; // Increase total quantity
            }

            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const { id, selectedSize } = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === id && item.selectedSize === selectedSize);

            if (existingItemIndex !== -1) {
                if (state.cartItems[existingItemIndex].cartQuantity > 1) {
                    state.cartItems[existingItemIndex].cartQuantity -= 1;
                } else {
                    state.cartItems.splice(existingItemIndex, 1);
                }
                state.cartTotalQty -= 1; // Decrease total quantity
            }

            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotalQty = 0;
            localStorage.removeItem('cartItems');
        },
        updateCartItemQuantity(state, action) {
            const { id, selectedSize, newQuantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id && item.selectedSize === selectedSize);
            if (existingItem) {
                existingItem.cartQuantity = newQuantity;
                state.cartTotalQty = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity} = cartSlice.actions;
export default cartSlice.reducer;