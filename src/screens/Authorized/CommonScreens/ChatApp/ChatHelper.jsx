import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import globalStyle from 'src/styles/GlobalStyles';
import {uploadStorage} from 'src/helpers/FirebaseHelper';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const ChatHelper = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.user.data.email);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      checkFileSize(
        image?.sourceURL,
        uploadStorage(user, {file: image.sourceURL, type: 'image'}),
        setModalVisible(!modalVisible),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      checkFileSize(
        result?.uri,
        (uploadStorage(user, {file: result.uri, type: 'other'}),
        setModalVisible(!modalVisible)),
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.log(err);
      }
    }
  };

  const checkFileSize = async (file, func) => {
    let fileSize = await RNFS.stat(file);
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileSize.size > maxSize) {
      Alert.alert(
        'File Size Limit Exceeded',
        'Please select a file up to 5 MB.',
      );
    } else {
      console.log('FileSize ==>', fileSize.size, 'MaxSize ==>', maxSize);
      func;
    }
  };

  return (
    <View>
      <View style={globalStyle().inline}>
        <Button
          color="white"
          title={'+'}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                What would you like to upload
              </Text>
              <View style={globalStyle().inline}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    pickImage();
                  }}>
                  <Text style={styles.textStyle}>Image</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    pickDocument();
                  }}>
                  <Text style={styles.textStyle}>File</Text>
                </Pressable>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>x</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ChatHelper;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
