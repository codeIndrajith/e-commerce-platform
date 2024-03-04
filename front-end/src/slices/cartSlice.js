import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // check the cart is already exits in the cartItems
      const existItem = state.cartItems((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.find((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // calculate shipping price (if order is more than $100 then shipping is free, else shipping price $10)
      state.shippingPrice = addDecimal(state.itemsPrice >= 100 ? 0 : 10);
      // calculate tax price (15% tax add)
      state.taxPrice = addDecimal(Number((state.itemsPrice * 0.15).toFixed(2)));
      // calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  }, // <-- write the functionality to cart add , delete , update like this...
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
