import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {current} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

//*USERS
export const firebaseLogIn = async (email, pwd) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, pwd);
    console.log('User logged in:', response);
    alert('User logged in successfully.');
  } catch (error) {
    console.error('Error signing in:', error);
    alert(error.message);
  }
};

export const createFirebaseUser = async ({
  email: email,
  password: password,
  displayName: displayName,
  phoneNumber: phoneNumber,
  employee: employee,
}) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    // await response.user.updateProfile({
    //   displayName: displayName || null,
    //   phoneNumber: phoneNumber || null,
    // });

    await firestore()
      .collection('users')
      .doc(response.user?.uid)
      .set({
        displayName: displayName || null,
        phoneNumber: phoneNumber || null,
        email: email,
        uid: response.user?.uid || null,
        // userType schema: 0 for admin, 1 for employee, 2 for users
        userType: employee ? 1 : 2,
      });
    console.log('User account created and signed in:', response);
    alert('User account created and signed in successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
    alert(error.message);
  }
};

export const firebaseLogOut = () => {
  auth().signOut();
};

export const currentUser = async () => {
  // return auth().currentUser._user.email;
  let user = await auth().currentUser;
  let userInfo = await firestore()
    .collection('users')
    .doc(user?.uid)
    .get()
    .then(resp => resp.data());
  const currentUserInfo = {
    email: user?.email,
    uid: user?.uid,
    displayName: userInfo?.displayName,
    userType: userInfo?.userType,
    phoneNumber: userInfo?.phoneNumber,
    profileImage: userInfo?.profileImage,
  };
  return currentUserInfo;
};

export const userStateChanged = (functionName, dispatch) => {
  //* Listener
  const subscriber = auth().onAuthStateChanged(functionName);
  // console.log('FIRING OnAuthStateChange LISTENER', dispatch);
  dispatch;
  return subscriber;
};

export const ResetPasswordEmail = async email => {
  await auth().sendPasswordResetEmail(email.email);
  Alert.alert(`Password reset link sent to ${email.email}`);
};

/////////////////////////////////////////////////////////////

//* Firestore

export const getChat = (onResult, onError, recipient) => {
  // const alphabetized = [recipient, currentUser()].sort().toString();
  firestore()
    .collection('chat')
    // .collection(`${currentUser()}+${recipient}`)
    // .collection(alphabetized)
    .onSnapshot(onResult, onError);
};

export const postChat = async ({
  user,
  message,
  recipient,
  downloadUrl,
  image,
}) => {
  try {
    await firestore()
      // .collection(alphabetized)
      .collection('chat')
      //   .doc(JSON.stringify(profileId))
      .doc(new Date().toISOString())
      .set({
        user: user.displayName,
        uid: user.uid,
        message: message ? message : null,
        downloadUrl: downloadUrl ? downloadUrl : null,
        image: image ? image : null,
        timestamp: Date(),
      });
    console.log('Text posted', user, message, recipient, downloadUrl, image);
  } catch (error) {
    console.error('Error posting profile:', error);
  }
};

export const getProducts = async () => {
  try {
    const results = await firestore().collection('products').get();
    // console.log(results?.docs);
    const products = results?.docs.map((doc, id) => ({
      id: id,
      title: doc.data().title,
      price: doc.data().price,
      imageURL: doc.data().imageURL,
      description: doc.data().description,
    }));
    return products;
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////////////

//* Storage

export const uploadStorage = async (user, file) => {
  try {
    const downloadURL = await uploadFile(file);
    if (file.type === 'image') {
      postChat({user: user, image: downloadURL});
    } else {
      postChat({
        user: user,
        downloadUrl: downloadURL,
      });
    }
    console.log('file Uploaded', user, file);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export const uploadFile = async doc => {
  const uploadUri = doc.file;
  const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  try {
    await storage().ref(fileName).putFile(uploadUri);
    const downloadURL = await getDownloadURL(fileName);
    return downloadURL;
  } catch (error) {
    console.error('Error in UploadFile Try Catch', error);
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

export const getOrders = async uid => {
  try {
    let col = firestore().collection('orders');
    if (uid) {
      //? if Userfield supplied, return just user orders
      return await col.doc(uid).get();
    } else {
      //? else return all users
      return await col.get();
    }
  } catch (error) {
    console.log('ERROR Getting Orders=> ', error);
    Alert.alert('There was an error getting the Order');
  }
};

export const placeOrderToServer = async data => {
  try {
    // console.log('Cartdata ==>', data.cartData, 'user=>', data.userData);
    const orders = await getOrders(data.userData.uid);
    const existingOrders = orders.exists ? orders.data().orders : [];
    const updatedOrders = [
      ...existingOrders,
      {order: data.cartData, timestamp: new Date().toISOString()},
    ];

    await firestore().collection('orders').doc(data.userData.uid).set({
      user: data.userData.uid,
      orders: updatedOrders,
    });

    Alert.alert('Placed Order');
  } catch (error) {
    console.error('Error placing order:', error);
    Alert.alert('Could Not Place Order', error.message);
  }
};

//* UpdateFirebase Profile

export const updateFirebaseProfile = async ({
  displayName: displayName,
  email: email,
  phoneNumber: phoneNumber,
  userType: userType,
  uid: uid,
  profileImage: profileImage,
}) => {
  console.log(displayName);
  console.log(email);
  console.log(phoneNumber);
  console.log(userType);
  console.log(uid);
  console.log(profileImage);

  await firestore()
    .collection('users')
    .doc(uid)
    .set({
      displayName: displayName || null,
      phoneNumber: phoneNumber || null,
      profileImage: profileImage || null,
      userType: userType,
      email: email,
      uid: uid,
    });

  // await auth().currentUser.updateProfile({
  //   displayName: displayName || null,
  //   phoneNumber: phoneNumber || null,
  //   profileImage: profileImage || null,
  // });
};
