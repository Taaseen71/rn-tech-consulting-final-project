import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const EmployeeMap = ({latitude, longitude}) => {
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.15,
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.15,
        }}>
        {latitude && (
          <Marker
            title={'Address'}
            // draggable
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default EmployeeMap;

const styles = StyleSheet.create({
  container: {
    height: 300, // Adjust the height as needed
    marginVertical: 10, // Add some vertical margin to separate it from other components
    marginHorizontal: 5,
  },
  map: {
    flex: 1, // Make the map take up all available space within its container
    borderRadius: 10, // Add some border radius for visual appeal
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
