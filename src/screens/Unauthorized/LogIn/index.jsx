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
import {firebaseLogIn} from 'src/helpers/FirebaseHelper';
import {Formik, withFormik} from 'formik';
// import * as Yup from 'yup';
import background from 'src/assets/login_wallpaper.jpg';
import {emailAndPasswordCheck} from 'src/helpers/Schemas';

const LogIn = () => {
  const navigation = useNavigation();
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');

  // const LogInSchema = Yup.object().shape({
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
                />
                {errors.password && touched.email ? (
                  <Text style={{fontWeight: 'bold', color: 'red', padding: 15}}>
                    {errors.password}
                  </Text>
                ) : null}
                {/* <Button onPress={handleSubmit} title="Submit" /> */}
                <TouchableOpacity
                  style={globalStyle('lightgreen').button}
                  onPress={handleSubmit}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
        <View flex={1}>
          {/* <TouchableOpacity
            style={globalStyle('skyblue').button}
            onPress={() => {
              navigation.navigate('Sign Up');
            }}>
            <Text>Don't have an account? Sign Up</Text>
          </TouchableOpacity> */}
          <Button
            title="Don't have an account? Sign Up"
            color="white"
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
