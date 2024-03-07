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

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders?.orders?.map((order, id) => (
          <List.Accordion
            title={`Order# ${id + 1}`}
            description={`Order Status: ${order.orderStatus}.\nTotal: ${order.order.total}.\nPlaced on ${order.timestamp}.`}
            //   onPress={handlePress}
          >
            {order?.order?.items?.map(item => (
              <List.Item title={`${item.title}`} />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
