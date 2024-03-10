import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {List} from 'react-native-paper';
import {formatTimestamp} from 'src/helpers/functionHelpers';
import {getOrderHistory} from 'src/helpers/DispatchHelpers';

const OrderHistoryScreen = memo(() => {
  const {userOrders, setUserOrders} = getOrderHistory();

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders?.orders?.reverse().map((order, id) => (
          <List.Accordion
            key={id}
            title={`Order# ${userOrders.orders.length - id}`}
            description={`Order Status: ${order.orderStatus}. \t\t Total: $${
              order.order.total
            }\n Placed on ${formatTimestamp(order.timestamp)}.`}>
            {order?.order?.items?.map((item, id) => (
              <List.Item
                key={id}
                title={`${item.title}`}
                description={`Quantity: ${item?.quantity}`}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
});

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
