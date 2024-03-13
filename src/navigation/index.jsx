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
  CheckOutScreen,
  OrderHistoryScreen,
  OrderDetailsScreen,
  RateDriverScreen,
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
  const cartTotal = useSelector(state => state.cart.cartNumber);

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
        icon={icon}
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

  const CartButton = () => {
    if (cartTotal) {
      return (
        <Button
          mode={'text'}
          textColor={'black'}
          onPress={() => navigation.navigate('Cart Screen')}
          icon={'cart'}>
          <Text>{cartTotal}</Text>
        </Button>
      );
    } else {
      return (
        <IconButton
          icon="cart-outline"
          iconColor={'black'}
          size={20}
          onPress={() => navigation.navigate('Cart Screen')}
        />
      );
    }
  };

  return user ? (
    <Authorized
      Stack={Stack}
      naviButton={naviButton}
      userData={userData}
      CartButton={CartButton}
    />
  ) : (
    <UnAuthorized Stack={Stack} naviButton={naviButton} userData={userData} />
  );
};

const blackBackButton = {
  headerTintColor: 'black',
};
const Authorized = ({Stack, naviButton, userData, CartButton}) => {
  if (userData?.userType === 1) {
    return <EmployeeScreen Stack={Stack} naviButton={naviButton} />;
  } else if (userData?.userType === 2) {
    return (
      <UserScreen
        Stack={Stack}
        naviButton={naviButton}
        CartButton={CartButton}
      />
    );
  }
};

const UserScreen = ({Stack, naviButton, CartButton}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="User Homepage"
      options={{
        headerLeft: () => <HamburgerMenu />,
        headerRight: () => <CartButton />,
      }}>
      {() => <UserHomeScreen />}
    </Stack.Screen>
    <Stack.Screen name="Order Placed" options={blackBackButton}>
      {() => <OrderPlacedScreenWithMaps />}
    </Stack.Screen>
    <Stack.Screen name="ChatApp" options={blackBackButton}>
      {() => <ChatApp />}
    </Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
    <Stack.Screen name="Cart Screen" options={blackBackButton}>
      {() => <CartScreen />}
    </Stack.Screen>
    <Stack.Screen name="CheckOut" options={blackBackButton}>
      {() => <CheckOutScreen />}
    </Stack.Screen>
    <Stack.Screen name="Order History" options={blackBackButton}>
      {() => <OrderHistoryScreen />}
    </Stack.Screen>
    <Stack.Screen name="Rate Driver" options={blackBackButton}>
      {() => <RateDriverScreen />}
    </Stack.Screen>
    <Stack.Screen
      options={{
        headerRight: () => <CartButton />,
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
      name="Orders"
      options={{
        headerLeft: () => <HamburgerMenu employee={true} />,
      }}>
      {() => <EmployeeHomeScreen />}
    </Stack.Screen>
    <Stack.Screen name="Order Details" options={blackBackButton}>
      {() => <OrderDetailsScreen />}
    </Stack.Screen>
    <Stack.Screen name="ChatApp">{() => <ChatApp />}</Stack.Screen>
    <Stack.Screen name="Profile">{() => <Profile />}</Stack.Screen>
    <Stack.Screen name="Order Placed" options={blackBackButton}>
      {() => <OrderPlacedScreenWithMaps />}
    </Stack.Screen>
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

    <Stack.Screen name="Sign Up" options={blackBackButton} component={SignUp} />
    <Stack.Screen name="Forgot Password" options={blackBackButton}>
      {() => <ForgotPassword />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default Navigation;
