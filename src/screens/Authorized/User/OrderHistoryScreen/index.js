import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {Button, List} from 'react-native-paper';
import {formatTimestamp} from 'src/helpers/functionHelpers';
import {getOrderHistory} from 'src/helpers/DispatchHelpers';
import {useNavigation} from '@react-navigation/native';

const OrderHistoryScreen = memo(() => {
  const {userOrders, setUserOrders} = getOrderHistory();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders?.orders?.map((order, id) => (
          <View key={id}>
            <List.Accordion
              key={id}
              title={`Order# ${userOrders.orders.length - id}`}
              description={`Order Status: ${order.orderStatus}. \t\t Total: $${
                order.order.total
              }\n Placed on ${formatTimestamp(order.timestamp)}.`}>
              {order?.order?.items?.map((item, idx) => (
                <View key={idx}>
                  <List.Item
                    // key={idx}
                    title={`${item.title}`}
                    description={`Quantity: ${item?.quantity}`}
                  />
                  {order.orderStatus !== 'Delivered' && (
                    <Button
                      onPress={() => {
                        navigation.navigate('Order Placed', {
                          orders: userOrders,
                          orderNumber: id,
                        });
                      }}>
                      Track Driver
                    </Button>
                  )}
                </View>
              ))}
              {order.orderStatus === 'Delivered' && (
                <Button
                  key={id}
                  onPress={() => {
                    navigation.navigate('Rate Driver', {
                      order: order,
                      orders: userOrders,
                      orderNumber: id,
                    });
                  }}>
                  Rate Driver
                </Button>
              )}
            </List.Accordion>
          </View>
        ))}
      </List.Section>
    </ScrollView>
  );
});

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
