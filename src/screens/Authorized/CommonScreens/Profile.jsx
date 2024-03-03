import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import globalStyle from 'src/styles/GlobalStyles';
import {SegmentedButtons} from 'react-native-paper';

const Profile = () => {
  const profileInfo = useSelector(state => state.user.userData);
  console.log('PROFILE', profileInfo);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('Hi');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState(5);
  const [uid, setUID] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // initialize all fields from profile info to useState
    setDisplayName(profileInfo.displayName);
    setEmail(profileInfo.email);
    setPhoneNumber(profileInfo.phoneNumber);
    setUserType(profileInfo.userType);
    setUID(profileInfo.uid);

    setProfileImage(profileInfo.profileImage);
  }, [profileInfo]);

  return (
    <View>
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(1).borders]}
        placeholder="Display Name"
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(1).borders]}
        placeholder="Email"
        value={email}
        // onSubmitEditing={() => postText()}
      />
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(1).borders]}
        placeholder="User Type"
        keyboardType="number-pad"
        value={uid}
      />
      <TextInput
        style={[globalStyle().TextInputComponent, globalStyle(1).borders]}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <SegmentedButtons
        value={userType}
        onValueChange={setUserType}
        buttons={[
          {
            value: 0,
            label: 'Admin',
          },
          {
            value: 1,
            label: 'Employee',
          },
          {
            value: 2,
            label: 'User',
          },
        ]}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
