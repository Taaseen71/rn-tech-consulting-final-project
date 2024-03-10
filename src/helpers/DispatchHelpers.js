//! CUSTOM HOOKS
//? Creating custom hooks for useDispatch here to use Globally

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders, getProducts} from './FirebaseHelper';
import {setOrders} from 'src/features/orders/orderSlice';
import {setProducts} from 'src/features/item/itemSlice';

export const getDispatchedOrders = () => {
  const dispatch = useDispatch();
  const [userOrders, setUserOrders] = useState([]);
  const reduxOrders = useSelector(state => state.order.orderData);

  useEffect(() => {
    const fetchOrdersToDispatch = async () => {
      try {
        const fetchOrders = await getOrders();
        console.log('FetchOrders, Dispatch => ', fetchOrders);
        // setUserOrders(fetchOrders.reverse());
        dispatch(setOrders(fetchOrders));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOrdersToDispatch();
  }, [dispatch]);

  useEffect(() => {
    console.log('REDUX ORDERS', reduxOrders);
    setUserOrders(reduxOrders);
  }, [dispatch, reduxOrders]);

  return {userOrders: userOrders, setUserOrders: setUserOrders};
};

export const fetchProducts = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setItems(products);
      dispatch(setProducts(products));
    };
    fetchProducts();
  }, [dispatch]);

  return {items: items, setItems: setItems};
};

export const getOrderHistory = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = useSelector(state => state.user.userData);

  useEffect(() => {
    const getUserOrders = async () => {
      const orders = await getOrders(user.uid);
      setUserOrders(orders);
      console.log(orders);
    };
    getUserOrders();
  }, []);

  return {userOrders: userOrders, setUserOrders: setUserOrders};
};
