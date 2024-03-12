import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import globalStyle from 'src/styles/GlobalStyles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from 'src/features/cart/cartSlice';
import Navigation from 'src/navigation';

const CheckOutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const userCart = useSelector(state => state.cart);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(
    useSelector(state => state.user.userData.phoneNumber),
  );
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 40.757889,
    longitude: -73.896725,
  });
  useEffect(() => {
    requestLocationPermission();

    console.log('Subscribed Location Getter');
    if (Platform.OS === 'ios') {
      const geoLocationGetter = getcurrentLocationWatcher(setCurrentLocation);
      return () => {
        Geolocation.clearWatch(geoLocationGetter);
        console.log('Unsubscribed Location Getter');
      };
    }
  }, []);

  const placeOrderWithUpdatedCart = () => {
    const updatedCartData = {
      ...userCart,
      userName: userData.displayName,
      phoneNumber: phoneNumber,
      address: {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        address: address,
      },
    };

    // console.log({
    //   userData: userData,
    //   cartData: updatedCartData,
    // });

    dispatch(
      placeOrder({
        userData: userData,
        cartData: updatedCartData,
      }),
    );
    navigation.navigate('User Homepage');
  };

  return (
    <View flex={1}>
      <View flex={1} style={globalStyle(5, 3).marginsAndPadding}>
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0).borders]}
          placeholder="Address"
          onChangeText={setAddress}
          value={address}
        />
        <TextInput
          style={[globalStyle().TextInputComponent, globalStyle(0).borders]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <View style={globalStyle().centerView}>
          <Text variant="bodyLarge">Latitude: {currentLocation?.latitude}</Text>
          <Text variant="bodyLarge">
            Longitude: {currentLocation?.longitude}
          </Text>
        </View>
      </View>
      <View flex={1} style={styles.container}>
        <MapView
          showsUserLocation={Platform.OS === 'ios' ? true : false}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation?.latitude || 40.757889,
            longitude: currentLocation?.longitude || -73.896725,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          region={{
            latitude: currentLocation?.latitude || 40.757889,
            longitude: currentLocation?.longitude || -73.896725,
            latitudeDelta: 0.05,
            longitudeDelta: 0.0121,
          }}>
          {/* {currentLocation && ( */}
          <Marker
            title={'Address'}
            draggable
            coordinate={{
              latitude: currentLocation?.latitude || 40.757889,
              longitude: currentLocation?.longitude || -73.896725,
              latitudeDelta: 0.05,
              longitudeDelta: 0.0121,
            }}
            onDragEnd={end => {
              console.log(end.nativeEvent.coordinate);
              setCurrentLocation(end.nativeEvent.coordinate);
            }}
          />
          {/*)}*/}
        </MapView>
      </View>
      <View style={globalStyle(15, 0).marginsAndPadding}>
        <Button
          mode={'contained'}
          textColor={'white'}
          onPress={placeOrderWithUpdatedCart}>
          Place Order
        </Button>
      </View>
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
    margin: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const getcurrentLocationWatcher = setCurrentLocation => {
  return Geolocation.getCurrentPosition(
    position => {
      console.log(
        'Latitude:',
        position.coords.latitude,
        'Longitude:',
        position.coords.longitude,
      );
      return setCurrentLocation(position.coords);
    },
    error => console.log(error.code, error.message),
  );
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const authorizationStatus = await Geolocation.requestAuthorization(
      'always',
    );
    if (authorizationStatus === 'denied') {
      console.log('denied', error);
    }
  }
  // else {
  //   const granted = await Geolocation.requestPermissions();
  //   if (!granted) {
  //     console.log('Not Granted', error);
  //   }
  // }
};
