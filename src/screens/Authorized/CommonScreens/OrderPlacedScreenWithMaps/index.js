import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import carIcon from 'src/assets/car-icon.png';
import LocationHelper from 'src/helpers/LocationHelper';
import {pushLocationToFirebase} from 'src/helpers/FirebaseHelper';

const OrderPlacedWithMaps = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    LocationHelper.requestLocationPermissionForiOS();
    LocationHelper.requestLocationPermissionForAndroid();
    LocationHelper.getCurrentLocation(position => {
      setCurrentLocation(position);
    });
    const unsubscribe = LocationHelper.watchUserLocation(position => {
      setCurrentLocation(position);
      pushLocationToFirebase(position);
    });

    return () => {
      unsubscribe();
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
              latitude: currentLocation?.latitude
                ? currentLocation?.latitude
                : 0,
              longitude: currentLocation?.longitude
                ? currentLocation?.longitude
                : 0,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
