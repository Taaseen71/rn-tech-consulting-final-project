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
import {createFirebaseUser} from 'src/helpers/FirebaseHelper';
import {Formik} from 'formik';
import background from 'src/assets/signup4_wallpaper.jpg';
import {emailAndPasswordCheck} from 'src/helpers/Schemas';
import {Switch} from 'react-native-paper';

const SignUp = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View flex={1}>
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <View flex={6}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={emailAndPasswordCheck}
            onSubmit={values =>
              createFirebaseUser({
                email: values.email,
                password: values.password,
                employee: isSwitchOn ? true : false,
                displayName: values.name,
              })
            }>
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
                  onChangeText={handleChange('name')}
                  placeholder={'Name'}
                  autoCapitalize={'words'}
                  value={values.name}
                />
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
                <View
                  style={[
                    globalStyle().centerView,
                    globalStyle('center').inline,
                  ]}>
                  <Text>Employee Account: </Text>

                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color={'black'}
                  />
                </View>
                <TouchableOpacity
                  style={globalStyle('black').button}
                  onPress={handleSubmit}>
                  <Text style={globalStyle('black').button.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          {/* <View style={[globalStyle().centerView, globalStyle().inline]}>
           
          </View> */}
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
