import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Button, List} from 'react-native-paper';
import React, {useState, useEffect, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getDispatchedOrders} from 'src/helpers/DispatchHelpers';
import {formatTimestamp} from 'src/helpers/functionHelpers';
import globalStyle from 'src/styles/GlobalStyles';
import NotificationHelper, {
  useForegroundNotifications,
} from 'src/helpers/NotificationHelper';

const EmployeeHomeScreen = memo(() => {
  const navigation = useNavigation();

  //?  CustomHooks
  const {userOrders, setUserOrders} = getDispatchedOrders();

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders.map((order, id) => (
          <List.Accordion
            key={id}
            title={`${order.order?.userName}`}
            left={props => <List.Icon {...props} icon="package" />}>
            <View style={globalStyle('space-between', 0.1).inline}>
              <List.Item title={`Status: ${order.orderStatus}`} />
              <Button
                key={id}
                onPress={() => {
                  navigation.navigate('Order Details', {
                    order: order,
                    orders: userOrders,
                    orderNumber: id,
                  });
                }}
                icon={'arrow-bottom-right-bold-box'}>
                {'Details'}
              </Button>
            </View>
            <List.Item title={`Time: ${formatTimestamp(order.timestamp)}`} />
            <List.Item title={`Total: $${order.order.total}`} />
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
});

export default EmployeeHomeScreen;
