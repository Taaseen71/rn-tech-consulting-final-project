import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {currentUser, getChat, postChat} from 'src/helpers/FirebaseHelper';
import globalStyle from 'src/styles/GlobalStyles';
// import auth from '@react-native-firebase/auth';

const Fetch = () => {
  const [text, changeText] = useState('');
  const [chats, changeChats] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(currentUser);
  }, []);

  function onResult(QuerySnapshot) {
    console.log('Got Users collection result.');
    console.log('QUERY SNAPSHOT ===> ', QuerySnapshot);
    changeChats(QuerySnapshot.docs);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    getChat(onResult, onError, 'admin@admin.com');
  }, []);

  const flatlistRef = useRef(null);
  const renderItem = useCallback(({item}) => {
    return (
      <View
        style={[
          item._data.user === user
            ? globalStyle().rightView
            : globalStyle().leftView,
          globalStyle(1, 2).marginsAndPadding,
        ]}>
        <View
          style={[
            item._data.user === user
              ? [globalStyle('rgba(0, 192, 255,1)').bcolor]
              : [globalStyle('rgba(62, 227, 81, 1)').bcolor],
            globalStyle('50%').maxWidth,
            globalStyle().borders,
          ]}>
          <View>
            <Text style={[globalStyle(10, 'white').fontSize]}>
              {item._data.user}
            </Text>
            <Text>{item._data.message}</Text>
          </View>
        </View>
        <Text style={[globalStyle(8, 'grey').fontSize]}>
          {item._data.timestamp.slice(15, 25)}
          {/* {item._data.timestamp.slice(4, 15)} */}
          {/* {Date().slice(4, 15)} */}
        </Text>
      </View>
    );
  });

  const postText = () => {
    postChat(user, text, 'admin@admin.com');
    changeText('');
  };
  const image = {
    uri: 'https://images.unsplash.com/photo-1487147264018-f937fba0c817?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  return (
    <View flex={1}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center', opacity: 1}}>
        <View flex={9}>
          <FlatList
            data={chats}
            renderItem={renderItem}
            ref={flatlistRef}
            onContentSizeChange={() =>
              flatlistRef.current.scrollToEnd({animated: true})
            }
          />
        </View>
        <View flex={1} style={globalStyle().inline}>
          <Button title={'+'} />
          <TextInput
            flex={8}
            style={[globalStyle().TextInputComponent, globalStyle(2).borders]}
            // multiline={true}
            onChangeText={changeText}
            value={text}
            onSubmitEditing={() => postText()}
          />
          <Button
            title={'Send'}
            flex={8}
            onPress={() => {
              postText();
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Fetch;
