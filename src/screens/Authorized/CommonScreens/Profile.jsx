import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import globalStyle from 'src/styles/GlobalStyles';

const Profile = () => {
  const profileInfo = useSelector(state => state.user.userData);
  console.log('PROFILE', profileInfo);
  const [text, changeText] = useState('');
  return (
    <View>
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(2).borders]}
        // multiline={true}
        onChangeText={changeText}
        value={text}
        onSubmitEditing={() => postText()}
      />
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(2).borders]}
        // multiline={true}
        onChangeText={changeText}
        value={text}
        onSubmitEditing={() => postText()}
      />
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(2).borders]}
        // multiline={true}
        onChangeText={changeText}
        value={text}
        onSubmitEditing={() => postText()}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
