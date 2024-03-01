import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {current} from '@reduxjs/toolkit';

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

export const firebaseSignUp = async (name, pwd) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(name, pwd)
      .then(resp => {
        console.log(resp.user);
        alert('User account created & signed in!');
      });
  } catch (error) {
    alert(error.message);
  }
};

export const firebaseLogOut = () => {
  auth().signOut();
};

export const currentUser = () => {
  return auth().currentUser._user.email;
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

export const postChat = async (user, message, recipient) => {
  const alphabetized = [recipient, currentUser()].sort().toString();
  try {
    // Use set() to create a new document or update an existing document
    await firestore()
      // .collection(alphabetized)
      .collection('chat')
      //   .doc(JSON.stringify(profileId))
      .doc(Date())
      .set({user: user, message: message, timestamp: Date()});
    console.log('Profile posted successfully');
  } catch (error) {
    console.error('Error posting profile:', error);
  }
};
