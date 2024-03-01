import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>OrderScreen</Text>
      <Button
        title="CartScreen"
        color="white"
        onPress={() => {
          navigation.navigate('CartScreen');
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
