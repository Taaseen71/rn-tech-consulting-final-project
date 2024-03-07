import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CheckOutScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>CheckOutScreen</Text>
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

export default CheckOutScreen;

const styles = StyleSheet.create({});
