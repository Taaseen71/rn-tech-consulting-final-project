import {View, Text, Button} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EmployeeHomeScreen,
  LogIn,
  SignUp,
  ChatApp,
  UserHomeScreen,
  Profile,
} from '@screens';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser, logInUser} from 'src/features/user/userSlice';
import auth from '@react-native-firebase/auth';
import {currentUser, userStateChanged} from 'src/helpers/FirebaseHelper';
import {ForgotPassword} from 'src/screens';

const Navigation = props => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await currentUser();
      dispatch(setCurrentUser(userInfo));
      setUserData(userInfo);
    };
    getUserInfo();
  }, [user]);

  useEffect(() => {
    function authStatechanged(user) {
      setUser(user);
    }
    userStateChanged(authStatechanged, dispatch(logInUser(user)));
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
    <Authorized Stack={Stack} naviButton={naviButton} userData={userData} />
  ) : (
    <UnAuthorized Stack={Stack} naviButton={naviButton} userData={userData} />
  );
};

const Authorized = ({Stack, naviButton, userData}) => {
  if (userData?.userType === 1) {
    return <EmployeeScreen Stack={Stack} naviButton={naviButton} />;
  } else if (userData?.userType === 2) {
    return <UserScreen Stack={Stack} naviButton={naviButton} />;
  }
};

const UserScreen = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen name="User Homepage">{() => <UserHomeScreen />}</Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
  </Stack.Navigator>
);
const EmployeeScreen = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen name="Employee Homepage">
      {() => <EmployeeHomeScreen />}
    </Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
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
    <Stack.Screen
      name="Forgot Password"
      options={{
        headerTintColor: 'black',
      }}>
      {() => <ForgotPassword />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default Navigation;
