import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  currentUser,
  getChat,
  postChat,
  uploadStorage,
} from 'src/helpers/FirebaseHelper';
import globalStyle from 'src/styles/GlobalStyles';
import whatsapp_background from 'src/assets/whatsapp_background.jpg';
import ChatHelper from './ChatHelper';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Icon} from 'react-native-paper';

const ChatApp = () => {
  const [text, changeText] = useState('');
  const [chats, changeChats] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const user = useSelector(state => state.user.userData);

  function onResult(QuerySnapshot) {
    changeChats(QuerySnapshot.docs);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    getChat(onResult, onError, 'admin@admin.com');
  }, []);

  const postText = () => {
    if (text.length > 0) {
      postChat({user: user, message: text});
      changeText('');
    } else {
    }
  };

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  openFile = async url => {
    const extension = getUrlExtension(url);

    // Feel free to change main path according to your requirements.
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options).promise.then(() => FileViewer.open(localFile));
  };

  const renderItem = useCallback(({item}) => {
    return (
      <View
        style={[
          item._data.uid === user.uid
            ? globalStyle().rightView
            : globalStyle().leftView,
          globalStyle(1, 2).marginsAndPadding,
        ]}>
        <View
          style={[
            item._data.uid === user.uid
              ? [globalStyle('rgba(0, 192, 255,1)').bcolor]
              : [globalStyle('rgba(62, 227, 81, 1)').bcolor],
            globalStyle('50%').maxWidth,
            globalStyle().borders,
          ]}>
          <View>
            <Text style={[globalStyle(10, 'white').fontSize]}>
              {item._data.user}
            </Text>
            {item._data.message && <Text> {item._data.message}</Text>}
            {item._data.image && (
              <Image
                style={globalStyle(150, 150).Image}
                source={{
                  uri: item._data?.image,
                }}
              />
            )}
            {item._data.downloadUrl && (
              <>
                {/* <Text> {item._data.downloadUrl}</Text> */}
                <TouchableOpacity
                  onPress={() => openFile(item._data.downloadUrl)}>
                  <Text style={globalStyle().textLink}>Click to Open File</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <Text style={[globalStyle(8, 'white').fontSize]}>
          {item._data?.timestamp?.slice(15, 25)}
        </Text>
      </View>
    );
  });

  const flatlistRef = useRef(null);
  return (
    <View flex={1}>
      <ImageBackground
        source={whatsapp_background}
        resizeMode="cover"
        style={styles.backgroundImage}>
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
          <ChatHelper flex={1} />
          {/* <Button color="white" title={'+'} onPress={() => pickDocument()} /> */}
          <TextInput
            flex={8}
            style={[globalStyle().TextInputComponent, globalStyle(0).borders]}
            // multiline={true}
            onChangeText={changeText}
            value={text}
            onSubmitEditing={() => postText()}
          />
          <Button
            textColor="white"
            mode="text"
            onPress={() => {
              postText();
            }}
            labelStyle={{
              marginHorizontal: 0,
              marginVertical: 0,
              paddingHorizontal: 0,
              // marginRight: 55,
            }}
            style={{width: 30}}
            contentStyle={{flexDirection: 'row-reverse'}}
            icon="send"></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatApp;
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
