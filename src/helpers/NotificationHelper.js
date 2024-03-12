import messaging from '@react-native-firebase/messaging';
import {useEffect, useRef} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

class NotificationHelper {
  constructor() {
    console.log('Notification Helper Running');
  }
  requestNotificationPermissionForiOS = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('notification Permission not granted');
    }
  };

  requestNotificationPermissionForAndroid = async () => {
    if (Platform.OS === 'android') {
      if (PermissionsAndroid.RESULTS.GRANTED) {
        try {
          let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notifications Permission Granted');
          } else {
            console.log('Notifications Permission Error');
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };
  getDeviceToken = async callback => {
    await messaging().registerDeviceForRemoteMessages();
    let token = await messaging().getToken();
    console.log('DEVICE token', token);
  };

  //   getForegroundNotification = async user_uid => {
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       const {uid, text} = remoteMessage.data || {};
  //       if (text) {
  //         if (uid === user_uid) {
  //           Alert.alert(JSON.stringify(text));
  //         } else {
  //           console.log(' uid does not match');
  //         }
  //       } else {
  //         Alert.alert(JSON.stringify(text));
  //       }
  //     });

  //     return unsubscribe; // Return the unsubscribe function
  //   };

  sendNotification = async (user, data) => {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAMe1tHqQ:APA91bG-ZCq-BkVSTjlZmHQVzS_Wz6Ih5-3OVBiLgupDPn5Ygt83kTQAgke9b_3T-KFVhkZqn6HLgB5S61IcShmP6wVto285hut2vEe8jxQaJqWNiWqNjHt_MP2tcy1_9-Qz7lSHi9YD',
    };
    const body = JSON.stringify({
      priority: 'HIGH',
      data: data,
      to: 'fzJyQqlLRoeTuz2Y5IHVal:APA91bEW6AcshDi6GLGlfV-ySSa-gRTGUcEU6_KNBOsXyJAPF1Ne4lelS0d0JWsjFu29c_zmlUR1IRXRpcEF9fzX8jLlVgmeJobWrgBni_qmb_DH84-uNvUHxTdsCUlLEWWJgQJClQU9',
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (response.ok) {
        console.log('Notification sent successfully');
      } else {
        console.error(
          'Failed to send notification:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };
}

export default new NotificationHelper();

export const useForegroundNotifications = user_uid => {
  //CUSTOM HOOK
  const unsubscribeRef = useRef(null);

  const getForegroundNotification = async user_uid => {
    unsubscribeRef.current = messaging().onMessage(async remoteMessage => {
      const {uid, text} = remoteMessage.data || {};
      if (text) {
        if (uid === user_uid) {
          Alert.alert(JSON.stringify(text));
        } else {
          console.log('uid does not match');
        }
      } else {
        Alert.alert(JSON.stringify(text));
      }
    });
  };

  const cleanupForegroundNotification = () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  };

  useEffect(() => {
    getForegroundNotification(user_uid);

    return cleanupForegroundNotification;
  }, [user_uid]);

  return null;
};
