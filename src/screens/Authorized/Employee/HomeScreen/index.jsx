import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createChat, firebaseLogOut, getChat} from 'src/helpers/FirebaseHelper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user)

  // useEffect(() => {
  //   getChat();
  // }, []);

  return (
    <View>
      <Button
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
    </View>
  );
};

export default HomeScreen;
