import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {Button, Icon, Menu, Divider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HamburgerMenu from 'src/components/HamburgerMenu';
import data from './data.json';
import globalStyle from 'src/styles/GlobalStyles';

const UserHomeScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={globalStyle().centerView}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
    );
  };
  const keyExtractor = item => item.id;

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default UserHomeScreen;
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
