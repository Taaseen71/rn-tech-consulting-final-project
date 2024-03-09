//! CUSTOM HOOKS
//? Creating custom hooks for useDispatch here to use Globally

import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getOrders} from './FirebaseHelper';
import {setOrders} from 'src/features/orders/orderSlice';

export const getDispatchedOrders = () => {
  const dispatch = useDispatch();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersToDispatch = async () => {
      try {
        const fetchOrders = await getOrders();
        console.log('FetchOrders, Dispatch => ', fetchOrders);
        setUserOrders(fetchOrders.reverse());
        dispatch(setOrders(fetchOrders));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOrdersToDispatch();
  }, [dispatch]);

  return {userOrders: userOrders, setUserOrders: setUserOrders};
};
