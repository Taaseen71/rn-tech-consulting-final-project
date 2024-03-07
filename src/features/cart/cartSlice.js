import {createSlice} from '@reduxjs/toolkit';
import {placeOrderToServer} from 'src/helpers/FirebaseHelper';

const findProductById = (items, productId) => {
  return items.find(item => item.id === productId);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartNumber: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const foundProduct = findProductById(state.items, action.payload.id);

      if (foundProduct) {
        console.log('Product found:', JSON.stringify(foundProduct));

        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );

        state.items = updatedItems;
        state.total += parseInt(action.payload.price);
        state.cartNumber += 1;
      } else {
        // createProduct
        console.log('not found');
        state.items = [...state.items, {...action.payload, quantity: 1}];
        state.total += parseInt(action.payload.price);
        state.cartNumber += 1;
      }
    },
    removeFromCart: (state, action) => {
      const foundProduct = findProductById(state.items, action.payload.id);

      if (foundProduct) {
        if (foundProduct.quantity > 1) {
          // reduce quantity
          const updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: item.quantity - 1}
              : item,
          );
          state.items = updatedItems;
          state.total -= parseInt(action.payload.price);
          state.cartNumber -= 1;
        } else {
          //remove from cart
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
          state.total -= parseInt(action.payload.price);
          state.cartNumber -= 1;
        }
      } else {
        console.log('Not in Cart');
      }
    },
    placeOrder: (state, action) => {
      placeOrderToServer(action.payload);
      state.items = [];
      state.total = 0;
      state.cartNumber = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, placeOrder} = cartSlice.actions;

export default cartSlice.reducer;
