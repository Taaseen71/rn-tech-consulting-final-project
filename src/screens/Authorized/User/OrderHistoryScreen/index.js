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
        {userOrders?.orders?.reverse().map((order, id) => (
          <List.Accordion
            key={id}
            title={`Order# ${userOrders.orders.length - id}`}
            description={`Order Status: ${order.orderStatus}. \t\t Total: $${
              order.order.total
            }\n Placed on ${formatTimestamp(order.timestamp)}.`}>
            {order?.order?.items?.map((item, id) => (
              <View key={id}>
                <List.Item
                  key={id}
                  title={`${item.title}`}
                  description={`Quantity: ${item?.quantity}`}
                />
                {order.orderStatus === 'Delivered' && (
                  <Button
                    onPress={() => {
                      navigation.navigate('Rate Driver', {
                        item: item,
                        otherParam: 'anything you want here',
                      });
                    }}>
                    Rate Driver
                  </Button>
                )}
              </View>
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
});

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
