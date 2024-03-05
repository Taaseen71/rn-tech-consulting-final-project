import {createSlice} from '@reduxjs/toolkit';

const findProductById = (items, productId) => {
  return items.find(item => item.id === productId);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    value: 0,
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
      } else {
        // createProduct
        console.log('not found');
        state.items = [...state.items, {...action.payload, quantity: 1}];
      }
    },
    removeFromCart: (state, action) => {
      const foundProduct = findProductById(state.items, action.payload.id);

      if (foundProduct) {
        if (foundProduct.quantity > 0) {
          // reduce quantity
          const updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: item.quantity - 1}
              : item,
          );
          state.items = updatedItems;
        } else {
          //remove from cart
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        }
      } else {
        console.log('Not in Cart');
      }
    },
    placeOrder: state => {
      //   const resetItems = [];
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, placeOrder} = cartSlice.actions;

export default cartSlice.reducer;
