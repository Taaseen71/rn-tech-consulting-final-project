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
// import FileViewer from 'react-native-file-viewer';
// await FileViewer.open(result?.uri);

const ChatHelper = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      // Check if the selected file is within the 5 MB limit
      const fileSize = await RNFS.stat(result?.uri);
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (fileSize.size > maxSize) {
        Alert.alert(
          'File Size Limit Exceeded',
          'Please select a file up to 5 MB.',
        );
      } else {
        console.log('FILESIZE ==>', fileSize.size);
        uploadStorage(result);
        setModalVisible(!modalVisible);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        throw err;
      }
    }
  };
  const uploadFile = () => {
    // Implement your file upload logic here
    if (selectedFile) {
      // You can use the selectedFile.uri to get the file path for upload
      Alert.alert(
        'File Uploaded',
        `File ${selectedFile.name} has been uploaded successfully.`,
      );
    } else {
      Alert.alert('No File Selected', 'Please select a file to upload.');
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
                  onPress={() => setModalVisible(!modalVisible)}>
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
                <Text style={styles.textStyle}>Close</Text>
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
    backgroundColor: 'grey',
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
