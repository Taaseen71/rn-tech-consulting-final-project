import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

class LocationHelper {
  getCurrentLocation = callback => {
    //Get Once

    Geolocation.getCurrentPosition(
      position => {
        callback(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
      },
    );
  };

  watchUserLocation = callback => {
    //Get Every
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
        callback(position.coords);
      },
      error => console.log(error.code, error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 500, //* Minimum distance
        interval: 20000, //* Milliseconds update
        fastestInterval: 2000, //* Fastest update interval
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );

    const cleanup = () => {
      Geolocation.clearWatch(geoLocationGetter);
      console.log('Unsubscribed Location Getter');
    };
    return cleanup;
  };

  requestLocationPermissionForiOS = async () => {
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

  requestLocationPermissionForAndroid = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Requesting Location',
            message: 'Asking for location permission',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          //   alert('You can use the location');
        } else {
          console.log('location permission denied');
          //   alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
}
export default new LocationHelper();
