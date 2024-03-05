import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CartScreen = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.products);
  return (
    <View>
      <Text>CartScreen</Text>
      <Button
        title="Order Placed"
        color="black"
        onPress={() => {
          navigation.navigate('Order Placed');
        }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
