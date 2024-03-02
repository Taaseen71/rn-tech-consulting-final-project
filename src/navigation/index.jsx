import {View, Text, Button} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LogIn, SignUp, ChatApp, ReactSagaScreen} from '@screens';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {logInUser} from 'src/features/user/userSlice';
import auth from '@react-native-firebase/auth';
import {userStateChanged} from 'src/helpers/FirebaseHelper';

const Navigation = props => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    function authStatechanged(user) {
      setUser(user);
    }
    // const subscriber = auth().onAuthStateChanged(authStatechanged);
    // dispatch(logInUser(user));
    // return subscriber;
    return userStateChanged(authStatechanged, dispatch(logInUser(user)));
  }, [user]);

  const naviButton = ({
    optionName: optionName,
    pageName: pageName,
    pageTitle: pageTitle,
    color: color,
  }) => {
    return {
      [optionName]: () => (
        <Button
          title={pageName}
          color={color ? color : undefined}
          onPress={() => {
            navigation.navigate(pageTitle ? pageTitle : pageName);
          }}
        />
      ),
    };
  };

  return user ? (
    <Authorized Stack={Stack} naviButton={naviButton} />
  ) : (
    <UnAuthorized Stack={Stack} naviButton={naviButton} />
  );
};

const Authorized = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
  </Stack.Navigator>
);

const navigationOptions = {
  headerBackTitleStyle: {color: 'black'},
};
const UnAuthorized = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Log In"
      options={naviButton({
        optionName: 'headerRight',
        pageName: 'Sign Up',
        color: 'black',
      })}>
      {() => <LogIn />}
    </Stack.Screen>

    <Stack.Screen
      name="Sign Up"
      options={{
        headerTintColor: 'black',
      }}
      component={SignUp}
    />
  </Stack.Navigator>
);

export default Navigation;
