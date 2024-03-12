import {createSlice} from '@reduxjs/toolkit';

const changeStateOrderData = (status, orderNumber, orders, employee) => {
  let orderID = orders.findIndex(
    uniqueOrder => uniqueOrder.timestamp === orderNumber,
  );
  if (orderID !== -1) {
    const updateOrder = {
      ...orders[orderID],
      orderStatus: status,
      employee: employee,
    };

    const newOrders = [
      ...orders.slice(0, orderID),
      updateOrder,
      ...orders.slice(orderID + 1),
    ];
    return newOrders;
  }
  return null;
};

const initialState = {
  orderData: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      //   console.log('ACTIONPAYLOAD', action.payload);
      state.orderData = action.payload;
    },
    changeDeliveryStatus: (state, action) => {
      const orderNumber = action.payload.order.timestamp;
      const changeOrders = changeStateOrderData(
        action.payload.status,
        orderNumber,
        action.payload.orders,
        action.payload.employee,
      );
      state.orderData = changeOrders;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrders, changeDeliveryStatus} = orderSlice.actions;

export default orderSlice.reducer;
