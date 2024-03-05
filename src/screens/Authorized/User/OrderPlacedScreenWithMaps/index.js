import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import carIcon from 'src/assets/car-icon.png';

const OrderPlacedWithMaps = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
    getGeoLocation(setCurrentLocation);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          title={'Hi'}
          draggable
          coordinate={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          image={carIcon}
        />
      </MapView>
      {/* <Button
        title="ChatScreen"
        color="black"
        onPress={() => {
          navigation.navigate('ChatApp');
        }}
      /> */}
    </View>
  );
};

export default OrderPlacedWithMaps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

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

const getGeoLocation = setCurrentLocation => {
  setInterval(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        return setCurrentLocation(position.coords);
      },
      error => console.log(error.code, error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, 10000);
};
