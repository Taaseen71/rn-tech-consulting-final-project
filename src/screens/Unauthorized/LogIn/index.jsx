import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {firebaseLogIn} from 'src/helpers/FirebaseHelper';
import {Formik} from 'formik';
import background from 'src/assets/login2_wallpaper.jpg';
import {emailAndPasswordCheck} from 'src/helpers/Schemas';

const LogIn = () => {
  const navigation = useNavigation();

  return (
    <View flex={1}>
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <View flex={9}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={emailAndPasswordCheck}
            onSubmit={values => firebaseLogIn(values.email, values.password)}>
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
                  <Text style={globalStyle().errorText}>{errors.email}</Text>
                ) : null}
                <TextInput
                  style={globalStyle().TextInputComponent}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Enter Password'}
                  autoCapitalize={'none'}
                  onSubmitEditing={handleSubmit}
                  value={values.password}
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

export default LogIn;
