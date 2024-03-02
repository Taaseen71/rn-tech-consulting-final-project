import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {current} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';

//USERS
export const firebaseLogIn = (user, pwd) => {
  auth()
    .signInWithEmailAndPassword(user, pwd)
    .then(resp => {
      console.log('Response ==>', resp.user._user);

      alert('User LogIn');
    })
    .catch(err => alert(err.message));
};

export const createFirebaseUser = async (name, pwd, userName, phoneNumber) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(name, pwd)
      .then(userCredential => {
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: userName,
            phoneNumber: phoneNumber,
            employee: true,
          })
          .then(() => {
            console.log('userCreated');
          });
        console.log('RESP ++++>', resp);
        alert('User account created & signed in!');
      });
  } catch (error) {
    alert(error.message);
  }
};

export const updateUserProfile = async () => {
  await auth()
    .currentUser.updateEmail('joe.bloggs@new-email.com')
    .then(resp => console.log('Update ==>', resp));
  console.log();
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
    const response = await storage().ref(fileName).putFile(uploadUri);

    // console.log('RESP', response);

    const downloadURL = await getDownloadURL(fileName);
    console.log('Download URL:', downloadURL);

    postChat({user: user, downloadUrl: downloadURL});

    console.log('Upload IMAGE ==>', 'Image Uploaded');
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
