import {StyleSheet} from 'react-native';

const globalStyle = (arg1, arg2, arg3, arg4) =>
  StyleSheet.create({
    flex: {
      flex: arg1,
    },
    centerView: {
      flex: arg1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightView: {
      flex: arg1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    leftView: {
      flex: arg1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    darkMode: {
      color: 'white',
      backgroundColor: 'black',
    },
    TextInputComponent: {
      height: !arg1 ? 40 : arg1,
      margin: 12,
      borderWidth: 0.5,
      borderRadius: 4,
      padding: 10,
      backgroundColor: 'white',
    },
    bcolor: {
      backgroundColor: arg1,
    },
    inline: {
      width: '100%',
      marginHorizontal: 12,
      flexDirection: 'row',
      justifyContent: arg1 ? arg1 : 'space-between',
      // backgroundColor: 'yellow',
      alignItems: 'center',
    },
    multiline: {
      flexDirection: 'column',
      justifyContent: arg1 ? arg1 : 'space-between',
      backgroundColor: arg2 ? arg2 : 'none',
      marginLeft: 12,
    },
    marginsAndPadding: {
      margin: arg1,
      padding: arg2,
    },
    button: {
      alignItems: 'center',
      backgroundColor: arg1 ? arg1 : '#DDDDDD',
      // color: arg1 === 'black' ? 'white' : 'black',
      padding: 10,
      borderRadius: 4,
      margin: 12,
      text: {
        color: arg1 === 'black' ? 'white' : 'black',
      },
    },
    Image: {
      width: arg1 ? arg1 : 200,
      height: arg2 ? arg2 : 200,
      margin: 12,
    },
    borders: {
      borderWidth: arg1 ? arg1 : 0,
      padding: 10,
      margin: 3,
      borderRadius: 6,
    },
    maxWidth: {
      maxWidth: arg1,
    },
    fontSize: {
      fontSize: arg1,
      color: arg2 ? arg2 : undefined,
    },
    errorText: {
      fontWeight: 'bold',
      color: 'red',
      textAlign: 'right',
      paddingRight: 15,
    },
    textLink: {
      color: 'white',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });

export default globalStyle;
