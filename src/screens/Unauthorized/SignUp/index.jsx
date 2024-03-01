import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {firebaseSignUp} from 'src/helpers/FirebaseHelper';
import {Formik} from 'formik';
import background from 'src/assets/signup4_wallpaper.jpg';
import {emailAndPasswordCheck} from 'src/helpers/Schemas';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View flex={1}>
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <View flex={6}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={emailAndPasswordCheck}
            onSubmit={values => firebaseSignUp(values.email, values.password)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  style={globalStyle().TextInputComponent}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={'Enter Email'}
                  autoCapitalize={'none'}
                  value={values.email}
                  //   {errors.email && touched.email ?
                  //     {errors.email}
                  //  : null}
                />
                {errors.email && touched.email ? (
                  <Text style={globalStyle().errorText}>{errors.email}</Text>
                ) : null}

                <TextInput
                  style={globalStyle().TextInputComponent}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Enter Password'}
                  autoCapitalize={'none'}
                  value={values.password}
                  onSubmitEditing={handleSubmit}
                />
                {errors.password && touched.email ? (
                  <Text style={globalStyle().errorText}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity
                  style={globalStyle('black').button}
                  onPress={handleSubmit}>
                  <Text style={globalStyle('black').button.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
        <View flex={1}>
          <Button
            title="Have an account? Log In"
            color="white"
            onPress={() => {
              navigation.navigate('Log In');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;
