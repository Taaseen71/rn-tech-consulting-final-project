import {View, Text} from 'react-native';
import React from 'react';

const ImageCropPicker = () => {
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
  return (
    <View>
      <Text>ImageCropPicker</Text>
    </View>
  );
};

export default ImageCropPicker;
