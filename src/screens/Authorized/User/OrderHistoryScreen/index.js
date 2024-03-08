import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getOrders} from 'src/helpers/FirebaseHelper';
import {Button, Card, List} from 'react-native-paper';

const OrderHistoryScreen = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = useSelector(state => state.user.userData);

  const [expanded, setExpanded] = React.useState(true);

  //   const handlePress = () => setExpanded(!expanded);

  const getUserOrders = async () => {
    const orders = await getOrders(user.uid);
    setUserOrders(orders);
    console.log(orders);
  };

  useEffect(() => {
    getUserOrders();
    return () => {};
  }, []);

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Format date
    const formattedTime = date.toLocaleTimeString(); // Format time
    return `${formattedDate} \t\t\t${formattedTime}`; // Concatenate date and time
  };

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders?.orders?.reverse().map((order, id) => (
          <List.Accordion
            title={`Order# ${userOrders.orders.length - id}`}
            description={`Order Status: ${order.orderStatus}. \t\t Total: $${
              order.order.total
            }\n Placed on ${formatTimestamp(order.timestamp)}.`}
            //   onPress={handlePress}
          >
            {order?.order?.items?.map((item, id) => (
              <List.Item
                title={`${item.title}`}
                description={`Quantity: ${item?.quantity}`}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
