import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EmployeeHomeScreen,
  LogIn,
  SignUp,
  ChatApp,
  UserHomeScreen,
  OrderPlacedScreenWithMaps,
  Profile,
  CartScreen,
  ForgotPassword,
  ProductDetails,
} from '@screens';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser, logInUser} from 'src/features/user/userSlice';
import auth from '@react-native-firebase/auth';
import {currentUser, userStateChanged} from 'src/helpers/FirebaseHelper';
import HamburgerMenu from 'src/components/HamburgerMenu';
import {Button, Icon, IconButton} from 'react-native-paper';
import globalStyle from 'src/styles/GlobalStyles';

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
    pageName: pageName,
    pageTitle: pageTitle,
    color: color,
    icon: icon,
  }) => {
    return icon ? (
      <IconButton
        icon="cart-outline"
        color={color ? color : 'black'}
        size={20}
        onPress={() => navigation.navigate(pageTitle ? pageTitle : pageName)}
      />
    ) : (
      <Button
        mode={'text'}
        textColor={color ? color : 'black'}
        onPress={() => navigation.navigate(pageTitle ? pageTitle : pageName)}>
        <Text>{pageTitle ? pageTitle : pageName}</Text>
        <Icon name="cart" />
      </Button>
    );
  };

  return user ? (
    <Authorized Stack={Stack} naviButton={naviButton} userData={userData} />
  ) : (
    <UnAuthorized Stack={Stack} naviButton={naviButton} userData={userData} />
  );
};

const navigationOptions = {
  headerBackTitleStyle: {color: 'black'},
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
    <Stack.Screen
      name="User Homepage"
      options={{
        headerLeft: () => <HamburgerMenu />,
        headerRight: () =>
          naviButton({
            pageTitle: 'Cart Screen',
            pageName: 'CartScreen',
            color: 'black',
            icon: 'cart-outline',
          }),
      }}>
      {() => <UserHomeScreen />}
    </Stack.Screen>
    <Stack.Screen
      name="Order Placed"
      options={{
        headerTintColor: 'black',
      }}>
      {() => <OrderPlacedScreenWithMaps />}
    </Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
    <Stack.Screen name="Cart Screen">{() => <CartScreen />}</Stack.Screen>
    <Stack.Screen
      options={{
        headerRight: () =>
          naviButton({
            pageTitle: 'Cart Screen',
            pageName: 'CartScreen',
            color: 'black',
            icon: 'cart-outline',
          }),
        headerTintColor: 'black',
      }}
      name="Product Details">
      {() => <ProductDetails />}
    </Stack.Screen>
  </Stack.Navigator>
);
const EmployeeScreen = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Employee Homepage"
      options={{
        headerLeft: () => <HamburgerMenu />,
      }}>
      {() => <EmployeeHomeScreen />}
    </Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
  </Stack.Navigator>
);

const UnAuthorized = ({Stack, naviButton}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Log In"
      options={{
        headerRight: () =>
          naviButton({
            optionName: 'headerRight',
            pageName: 'Sign Up',
            color: 'black',
          }),
      }}>
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
