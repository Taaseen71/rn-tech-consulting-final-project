import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {ResetPasswordEmail, firebaseLogIn} from 'src/helpers/FirebaseHelper';
import {Formik} from 'formik';
import background from 'src/assets/login2_wallpaper.jpg';
import {emailCheck} from 'src/helpers/Schemas';
const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <View flex={1}>
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <View flex={9}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={values => ResetPasswordEmail(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <TextInput
                  style={globalStyle().TextInputComponent}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={'Enter Email'}
                  autoCapitalize={'none'}
                  value={values.email}
                />
                <TouchableOpacity
                  style={globalStyle('black').button}
                  onPress={handleSubmit}>
                  <Text style={globalStyle('black').button.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          {/* <Button
            title="Forgot Password?"
            color="black"
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          /> */}
        </View>
        <View flex={1}>
          <Button
            title="Don't have an account? Sign Up"
            color="black"
            onPress={() => {
              navigation.navigate('Sign Up');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
