import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderPlacedWithMaps = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>OrderPlacedWithMaps</Text>
      <Button
        title="ChatScreen"
        color="white"
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}
      />
    </View>
  );
};

export default OrderPlacedWithMaps;

const styles = StyleSheet.create({});
