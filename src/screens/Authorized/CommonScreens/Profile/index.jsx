import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import globalStyle from 'src/styles/GlobalStyles';
import {Button, SegmentedButtons} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';
import {pickImage} from 'src/components/UploadHelpers';
import {
  currentUser,
  updateFirebaseProfile,
  uploadFile,
} from 'src/helpers/FirebaseHelper';
import defaultIMG from './defaultAvatarImage.jpg';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  // const profileInfo = useSelector(state => state.user.userData);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('Hi');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState(5);
  const [uid, setUID] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [userInfo, setUserInfo] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await currentUser();
      setUserInfo(user);
      console.log('UserInfo', user);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    setDisplayName(userInfo.displayName);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);
    setUserType(userInfo.userType);
    setUID(userInfo.uid);

    setProfileImage(userInfo.profileImage);
  }, [userInfo]);

  const uploadProfileImage = async () => {
    try {
      let ImagePick = await pickImage();
      // console.log(ImagePick);
      let uploadedFile = await uploadFile({file: ImagePick, type: 'image'});
      console.log('UPLOADED', uploadedFile);
      setProfileImage(uploadedFile);
    } catch (error) {
      if (error.message === 'User cancelled the document picker') {
        console.log('User cancelled the document picker');
      } else if (
        error.message ===
        "Cannot read properties of undefined (reading 'substring')"
      ) {
        console.log('User cancelled the document picker');
      } else {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  const handleSubmit = () => {
    updateFirebaseProfile({
      displayName: displayName,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      uid: uid,
      profileImage: profileImage,
    });
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.container}>
        <Button onPress={uploadProfileImage}>
          {/* {profileImage && ( */}
          <Avatar.Image
            size={150}
            source={profileImage ? {uri: profileImage} : defaultIMG}
          />
          {/* )} */}
          {/* <Avatar.Image size={150} source={{uri: profileImage || null}} /> */}
        </Button>
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0.3).borders]}
          placeholder="Display Name"
          onChangeText={setDisplayName}
          value={displayName}
        />
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0.3).borders]}
          placeholder="Email"
          value={email}
          // onSubmitEditing={() => postText()}
        />
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0.3).borders]}
          placeholder="User Type"
          keyboardType="number-pad"
          value={uid}
        />
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0.3).borders]}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <SegmentedButtons
          value={userType}
          onValueChange={() => {}}
          // onValueChange={setUserType}
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
      <Button
        mode={'contained'}
        textColor={'white'}
        style={styles.button}
        onPress={handleSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  button: {
    marginHorizontal: 15,
  },
});
