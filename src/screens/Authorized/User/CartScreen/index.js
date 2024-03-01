import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>CartScreen</Text>
      <Button
        title="OrderPlacedWithMaps"
        color="white"
        onPress={() => {
          navigation.navigate('OrderPlacedWithMaps');
        }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
