import {View, Text} from 'react-native';
import React from 'react';
import {Button, Menu, Divider, Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {firebaseLogOut} from 'src/helpers/FirebaseHelper';

const HamburgerMenu = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={openMenu}>
          <Icon source="menu" size={30} />
        </Button>
      }>
      <Menu.Item
        onPress={() => {
          navigation.navigate('Profile');
          setVisible(!visible);
        }}
        title="Profile"
        leadingIcon="account"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          navigation.navigate('ChatApp');
          setVisible(!visible);
        }}
        title="Chat"
        leadingIcon="chat"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate('Order Placed');
          setVisible(!visible);
        }}
        title="Driver chat"
        leadingIcon="car"
      />
      {/* <Menu.Item
        onPress={() => {
          navigation.navigate('ChatApp');
          setVisible(!visible);
        }}
        title="Driver chat"
        leadingIcon="car"
      /> */}
      <Divider />
      <Menu.Item
        onPress={() => {
          firebaseLogOut();
          setVisible(!visible);
        }}
        title="LogOut"
        leadingIcon="logout"
      />
    </Menu>
  );
};

export default HamburgerMenu;
