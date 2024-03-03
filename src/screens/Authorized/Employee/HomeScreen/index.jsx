import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  createChat,
  firebaseLogOut,
  getChat,
  updateUserProfile,
} from 'src/helpers/FirebaseHelper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user)

  // useEffect(() => {
  //   getChat();
  // }, []);

  return (
    <SafeAreaView>
      {/* <Button icon="chat">Press me</Button> */}
      {/* <EvilIcons name="camera" style={{color: 'black', fontSize: 50}} /> */}
      {/* <AntDesign name="we" style={{color: 'black', fontSize: 50}} /> */}
      {/* <Entypo name="chat" style={{color: 'black', fontSize: 50}} /> */}
      <Button
        onPress={() => {
          navigation.navigate('ChatApp');
        }}>
        <Entypo name="chat" style={{color: 'black', fontSize: 20}} />
        <Text> Chat</Text>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('ChatApp');
        }}>
        <AntDesign name="car" style={{color: 'black', fontSize: 20}} />
        <Text> Driver Chat</Text>
      </Button>

      <Button
        onPress={() => {
          firebaseLogOut();
        }}>
        <AntDesign name="logout" style={{color: 'black', fontSize: 20}} />
        <Text> LogOut</Text>
      </Button>
      {/* <Button
        title="Chat with Driver"
        onPress={() => {
          navigation.navigate('ChatApp');
        }}
      />
      <Button
        title="create chat"
        onPress={() => {
          alert('Chatting With Admin');
          createChat('admin@admin.com');
          navigation.navigate('ChatApp');
        }}
      />
      <Button
        title="Log Out"
        onPress={() => {
          firebaseLogOut();
        }}
      />
      <Button
        title="update profile"
        onPress={() => {
          updateUserProfile();
        }}
      /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
