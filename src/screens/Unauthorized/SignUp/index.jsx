import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {firebaseSignUp} from 'src/helpers/FirebaseHelper';
import {Formik, withFormik} from 'formik';
import * as Yup from 'yup';
import background from 'src/assets/signup2_wallpaper.jpg';
import {emailAndPasswordCheck} from 'src/helpers/Schemas';

const SignUp = () => {
  const navigation = useNavigation();

  // const SignUpSchema = Yup.object().shape({
  //   email: Yup.string().email('Invalid email').required('Required'),
  //   password: Yup.string()
  //     .required('Required')
  //     .min(5, 'Password too short')
  //     .matches(
  //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
  //       'Minimum eight characters, at least one letter and one number',
  //     ),
  // });

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
                />
                {errors.email && touched.email ? (
                  <Text style={{fontWeight: 'bold', color: 'red', padding: 15}}>
                    {errors.email}
                  </Text>
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
                  <Text style={{fontWeight: 'bold', color: 'red', padding: 15}}>
                    {errors.password}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={globalStyle('skyblue').button}
                  onPress={handleSubmit}>
                  <Text>Submit</Text>
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
