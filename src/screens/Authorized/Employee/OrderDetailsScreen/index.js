import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, Card, Divider, List, Menu, IconButton} from 'react-native-paper';
import globalStyle from 'src/styles/GlobalStyles';
import {formatTimestamp} from 'src/helpers/functionHelpers';
import {useDispatch, useSelector} from 'react-redux';
import {changeDeliveryStatus} from 'src/features/orders/orderSlice';
import EmployeeMap from './EmployeeMap';

const OrderDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [foundItem, setFoundItem] = useState('');
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const employee = useSelector(state => state.user.userData);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {order, otherParam} = route.params;
  console.log('ROUTE ==>', route.params);
  return (
    <ScrollView>
      <Card style={globalStyle(5, 5).marginsAndPadding}>
        <Card.Content>
          <View style={globalStyle().centerView}>
            <Text variant="titleLarge">{order.order?.userName}</Text>
          </View>
          <Divider style={globalStyle(15, 0).marginsAndPadding} />
          <View style={globalStyle().centerView}>
            <Text variant="bodyMedium">
              Latitude: {order.order?.address?.latitude}
            </Text>
            <Text variant="bodyMedium">
              Longitude: {order.order?.address?.longitude}
            </Text>
            {order.order?.address?.address && (
              <Text variant="bodyMedium">
                Address: {order.order?.address?.address}
              </Text>
            )}
            {order.order?.address?.phoneNumber && (
              <Text variant="bodyMedium">
                {order.order?.address?.phoneNumber}
              </Text>
            )}
            {order?.employee?.employeeRating && (
              <Text variant="bodyMedium">
                {`Employee Rating: ${order?.employee?.employeeRating}`}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
      <Card style={globalStyle(5, 5).marginsAndPadding}>
        <Card.Content>
          <View style={globalStyle().centerView}>
            <Text variant="titleSmall">Items Ordered: </Text>
            {order.order?.items?.map((item, key) => (
              <Text key={key} variant="bodyMedium">
                {item?.title}
              </Text>
            ))}
          </View>
          <Divider style={globalStyle(15, 0).marginsAndPadding} />
          <View style={globalStyle().centerView}>
            <Text variant="titleMedium">Total: ${order.order?.total}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={globalStyle(5, 5).marginsAndPadding}>
        <Card.Content>
          <View style={globalStyle().centerView}>
            <Text variant="titleSmall">Order Status: </Text>

            <View style={globalStyle().inline}>
              <Text variant="bodyMedium">{order?.orderStatus}</Text>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    onPress={openMenu}
                    icon={'arrow-down-drop-circle'}>
                    Show menu
                  </IconButton>
                }>
                <Menu.Item
                  disabled={order.orderStatus == 'Ordered' && true}
                  onPress={() => {
                    dispatch(
                      changeDeliveryStatus({
                        order: order,
                        status: 'Ordered',
                        orders: route.params.orders,
                        employee: employee,
                      }),
                    );
                    navigation.navigate('Orders');
                  }}
                  title="Ordered"
                />
                <Menu.Item
                  disabled={order.orderStatus == 'Shipped' && true}
                  onPress={() => {
                    dispatch(
                      changeDeliveryStatus({
                        order: order,
                        status: 'Shipped',
                        orders: route.params.orders,
                        employee: employee,
                      }),
                    );
                    navigation.navigate('Orders');
                  }}
                  title="Shipped"
                />
                <Divider />
                <Menu.Item
                  disabled={order.orderStatus == 'Delivered' && true}
                  onPress={() => {
                    dispatch(
                      changeDeliveryStatus({
                        order: order,
                        status: 'Delivered',
                        orders: route.params.orders,
                        employee: employee,
                      }),
                    );
                    navigation.navigate('Orders');
                  }}
                  title="Delivered"
                />
              </Menu>
            </View>
            <Text variant="bodySmall">{formatTimestamp(order?.timestamp)}</Text>
          </View>
        </Card.Content>
      </Card>

      <EmployeeMap
        style={{height: 200, width: '100%'}}
        latitude={order.order?.address?.latitude}
        longitude={order.order?.address?.longitude}
      />
    </ScrollView>
  );
};

export default OrderDetailsScreen;
