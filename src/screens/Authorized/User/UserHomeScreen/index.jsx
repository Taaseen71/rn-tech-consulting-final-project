import {View, Text, SafeAreaView} from 'react-native';
import {Button, Icon, Menu, Divider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HamburgerMenu from 'src/components/HamburgerMenu';

const UserHomeScreen = () => {
  const navigation = useNavigation();

  navigation.setOptions({
    headerLeft: () => <HamburgerMenu />,
  });

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}></View>
    </SafeAreaView>
  );
};

export default UserHomeScreen;
