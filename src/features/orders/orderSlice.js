import {createSlice} from '@reduxjs/toolkit';

const findOrder = (uid, orderNumber) => {
  let order = state.orderData[uid].find(
    uniqueOrder => uniqueOrder.timestamp === orderNumber,
  );
  return order;
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderData: [],
  },
  reducers: {
    setOrders: (state, action) => {
      //   console.log('ACTIONPAYLOAD', action.payload);
      state.orderData = action.payload;
    },
    shipped: (state, action) => {
      console.log('ActionPayload Shipped ==>', action.payload);

      //   const uid = action.payload.userOrder.uid;
      //   const orderNumber = action.payload.userOrder.timestamp;
      //   let order = findOrder(uid, orderNumber);
      //   console.log('Find-Order ==>', order);
      //   order.orderStatus = 'Shipped';
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrders, shipped} = orderSlice.actions;

export default orderSlice.reducer;
