import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   createChat,
//   firebaseLogOut,
//   getChat,
//   updateUserProfile,
// } from 'src/helpers/FirebaseHelper';
// import {Menu, Divider, Icon} from 'react-native-paper';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
import HamburgerMenu from 'src/components/HamburgerMenu';

const EmployeeHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  // navigation.setOptions({
  //   headerLeft: () => (
  //     <HamburgerMenu visible={visible} setVisible={setVisible} />
  //   ),
  // });

  return (
    <SafeAreaView>
      {/* <Button icon="chat">Press me</Button> */}
      {/* <EvilIcons name="camera" style={{color: 'black', fontSize: 50}} /> */}
      {/* <AntDesign name="we" style={{color: 'black', fontSize: 50}} /> */}
      {/* <Entypo name="chat" style={{color: 'black', fontSize: 50}} /> */}
      {/* <Button
        onPress={() => {
          navigation.navigate('ChatApp');
        }}>
        <Entypo name="chat" style={{color: 'black', fontSize: 20}} />
        <Text> Chat</Text>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('ChatApp');
        }}>
        <AntDesign name="car" style={{color: 'black', fontSize: 20}} />
        <Text> Driver Chat</Text>
      </Button>

    */}
    </SafeAreaView>
  );
};

export default EmployeeHomeScreen;
