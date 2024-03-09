import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Button, List} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getDispatchedOrders} from 'src/helpers/DispatchHelpers';
import {formatTimestamp} from 'src/helpers/functionHelpers';
import globalStyle from 'src/styles/GlobalStyles';

const EmployeeHomeScreen = () => {
  const navigation = useNavigation();

  //?  CustomHooks
  const {userOrders, setUserOrders} = getDispatchedOrders();

  useEffect(() => {
    // console.log('userOrders', userOrders);
  }, []);

  return (
    <ScrollView>
      <List.Section title="Orders">
        {userOrders.map((order, _id) => (
          <List.Accordion
            key={_id}
            title={`${order.order?.userName}`}
            left={props => <List.Icon {...props} icon="package" />}

            // expanded={expanded}
            // onPress={() => setExpanded(!expanded)}
          >
            <View style={globalStyle('space-between', '0').inline}>
              <List.Item title={`Status: ${order.orderStatus}`} />
              <Button
                onPress={() => {
                  navigation.navigate('Order Details', {
                    order: order,
                    orders: userOrders,
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
};

export default EmployeeHomeScreen;
