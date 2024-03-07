import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
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
  const [currentLocation, setCurrentLocation] = useState();
  useEffect(() => {
    requestLocationPermission();

    console.log('Subscribed Location Getter');
    const geoLocationGetter = getcurrentLocationWatcher(setCurrentLocation);
    return () => {
      Geolocation.clearWatch(geoLocationGetter);
      console.log('Unsubscribed Location Getter');
    };
  }, []);

  return (
    <View flex={1}>
      <View flex={1}>
        <Text>
          Latitude: {currentLocation?.latitude}, Longitude:
          {currentLocation?.longitude}
        </Text>

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
      </View>
      <View flex={1} style={styles.container}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          region={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.0121,
          }}>
          {currentLocation && (
            <Marker
              title={'Address'}
              draggable
              coordinate={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
              }}
              onDragEnd={end => {
                console.log(end.nativeEvent.coordinate);
                setCurrentLocation(end.nativeEvent.coordinate);
              }}
            />
          )}
        </MapView>
      </View>

      <Button
        title="Place Order"
        color="black"
        onPress={() => {
          const updatedCartData = {
            ...userCart.items,
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
        }}
      />
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 250,
    height: 250,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
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
  } else {
    const granted = await Geolocation.requestPermissions();
    if (!granted) {
      console.log('Not Granted', error);
    }
  }
};
