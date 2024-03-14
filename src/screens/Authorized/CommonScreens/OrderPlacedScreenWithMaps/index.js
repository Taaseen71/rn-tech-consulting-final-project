import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import carIcon from 'src/assets/car-icon.png';
import LocationHelper from 'src/helpers/LocationHelper';
import {
  listenForLocationUpdates,
  pushLocationToFirebase,
} from 'src/helpers/FirebaseHelper';
import {useSelector} from 'react-redux';

const OrderPlacedWithMaps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const route = useRoute();
  const user = useSelector(state => state.user.userData);

  const {orders, orderNumber, order} = route.params;

  useEffect(() => {
    LocationHelper.requestLocationPermissionForiOS();
    LocationHelper.requestLocationPermissionForAndroid();
    LocationHelper.getCurrentLocation(position => {
      setCurrentLocation(position);
    });
  }, []);

  useEffect(() => {
    if (user.userType === 1) {
      //if deliveryboy, update current location
      const unsubscribeWatchUserLocation = LocationHelper.watchUserLocation(
        position => {
          setCurrentLocation(position);
          // pushLocationToFirebase(position, orders, orderNumber);
          pushLocationToFirebase(position, order);
        },
      );
      return () => {
        unsubscribeWatchUserLocation();
      };
    }
  }, [orders, orderNumber, user.userType]);

  useEffect(() => {
    // console.log('userType', user.userType);
    if (user.userType === 2) {
      // if user, get deliveryboy location
      const unsubscribeCurrentDeliveryBoyLocation = listenForLocationUpdates(
        orders,
        orderNumber,
        setCurrentLocation,
      );
      return () => {
        unsubscribeCurrentDeliveryBoyLocation();
      };
    }
  }, [orders, orderNumber]);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={user.userType > 1 ? false : true}
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
