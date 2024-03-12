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

    console.log('Subscribed Location Getter');
    const geoLocationGetter = Geolocation.watchPosition(
      position => {
        console.log(
          'Latitude:',
          position.coords.latitude,
          'Longitude:',
          position.coords.longitude,
          'Speed:',
          position.coords.speed,
        );
        // console.log('Location Updating, OrderPlacedScreen, Line 88');
        return setCurrentLocation(position.coords);
      },
      error => console.log(error.code, error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 300, // Minimum distance (in meters) for an update event.
        interval: 5000, // Milliseconds between each update
        fastestInterval: 2000, // Fastest update interval
        forceRequestLocation: true, // Whether to trigger a location request even if a location is already available
        showLocationDialog: true, // Whether to show a location dialog when location permissions are not granted
      },
    );
    return () => {
      Geolocation.clearWatch(geoLocationGetter);
      console.log('Unsubscribed Location Getter');
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 40.757889,
          longitude: -73.896725,
          latitudeDelta: 0.015,
          longitudeDelta: 100,
        }}
        region={{
          latitude: currentLocation?.latitude || 40.757889,
          longitude: currentLocation?.longitude || -73.896725,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        }}>
        {currentLocation && (
          <Marker
            title={'Uber'}
            // draggable

            coordinate={{
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 100,
            }}
            image={carIcon}
          />
        )}
      </MapView>
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
  }
  //  else {
  //   const granted = await Geolocation.requestPermissions();
  //   if (!granted) {
  //     console.log('Not Granted', error);
  //   }
  // }
};

// const getGeoLocation = setCurrentLocation => {
//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         // console.log(position);
//         console.log('Location Updating, OrderPlacedScreen, Line 88');
//         return setCurrentLocation(position.coords);
//       },
//       error => console.log(error.code, error.message),
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 50, // Minimum distance (in meters) for an update event.
//         interval: 5000, // Milliseconds between each update
//         fastestInterval: 2000, // Fastest update interval
//         forceRequestLocation: true, // Whether to trigger a location request even if a location is already available
//         showLocationDialog: true, // Whether to show a location dialog when location permissions are not granted
//       },
//     );
//   };
//   // GET One first
//   getLocation();
//   // GET one every set seconds
//   // setInterval(() => {
//   //   getLocation();
//   // }, 30000);
// };
