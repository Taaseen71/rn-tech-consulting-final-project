import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {current} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';

//USERS
export const firebaseLogIn = async (email, pwd) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, pwd);
    console.log('User logged in:', response.user.email);
    alert('User logged in successfully.');
  } catch (error) {
    console.error('Error signing in:', error);
    alert(error.message);
  }
};

export const createFirebaseUser = async (
  email,
  pwd,
  displayName,
  phoneNumber,
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(email, pwd);
    await response.user.updateProfile({
      displayName: displayName,
      phoneNumber: phoneNumber,
      employee: true,
    });
    console.log('User account created and signed in:', response.user.email);
    alert('User account created and signed in successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
    alert(error.message);
  }
};

export const firebaseLogOut = () => {
  auth().signOut();
};

export const currentUser = () => {
  return auth().currentUser._user.email;
};

export const userStateChanged = (functionName, dispatch) => {
  //* Listener
  const subscriber = auth().onAuthStateChanged(functionName);
  console.log('FIRING OnAuthStateChange LISTENER', dispatch);
  dispatch;
  return subscriber;
};

/////////////////////////////////////////////////////////////

//* Firestore

export const createChat = async recipient => {
  const alphabetized = [recipient, currentUser()].sort().toString();
  firestore().collection(alphabetized).doc(`${Date()}`);
  // .set({user: currentUser(), message: '', timestamp: Date()});
};

export const getChat = (onResult, onError, recipient) => {
  const alphabetized = [recipient, currentUser()].sort().toString();
  firestore()
    .collection('chat')
    // .collection(`${currentUser()}+${recipient}`)
    // .collection(alphabetized)
    .onSnapshot(onResult, onError);
};

export const postChat = async ({
  user: user,
  message: message,
  recipient: recipient,
  downloadUrl: downloadUrl,
}) => {
  // const alphabetized = [recipient, currentUser()].sort().toString();

  try {
    await firestore()
      // .collection(alphabetized)
      .collection('chat')
      //   .doc(JSON.stringify(profileId))
      .doc(new Date().toISOString())
      .set({
        user: user,
        message: message ? message : null,
        downloadUrl: downloadUrl ? downloadUrl : null,
        timestamp: Date(),
      });
    console.log('Profile posted');
  } catch (error) {
    console.error('Error posting profile:', error);
  }
};

/////////////////////////////////////////////////////////////

//* Storage

export const uploadStorage = async file => {
  const uploadUri = file.uri;
  const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const user = currentUser();
  console.log('USER ============>', user);

  console.log('UPLOAD', uploadUri);

  try {
    await storage().ref(fileName).putFile(uploadUri);
    const downloadURL = await getDownloadURL(fileName);
    postChat({user: user, downloadUrl: downloadURL});
    console.log('Image Uploaded');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const getDownloadURL = async fileName => {
  try {
    const url = await storage().ref(fileName).getDownloadURL();
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
};
