import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  products: [],
  isFetching: false,
  failure: false,
  errorMessage: undefined,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    request: state => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
      state.failure = false;
      state.errorMessage = undefined;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {request, success, setProducts, failure} = itemSlice.actions;

export default itemSlice.reducer;
