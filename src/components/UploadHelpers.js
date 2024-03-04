import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';

export const pickImage = async () => {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    const completedFileSizeCheck = await checkFileSize(image.sourceURL);
    return completedFileSizeCheck;
  } catch (err) {
    console.log(err);
  }
};

export const checkFileSize = async (file, func) => {
  let fileSize = await RNFS.stat(file);
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
  if (fileSize.size > maxSize) {
    Alert.alert('File Size Limit Exceeded', 'Please select a file up to 5 MB.');
  } else {
    console.log('File Size under Limit');
    return file;
  }
};
