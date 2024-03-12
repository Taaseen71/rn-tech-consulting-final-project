import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Button, Icon, RadioButton} from 'react-native-paper';

const RateDriverScreen = () => {
  const route = useRoute();
  const {order, otherParam} = route.params;
  const [value, setValue] = React.useState(0);

  return (
    <RadioButton.Group
      onValueChange={newValue => setValue(newValue)}
      value={value}>
      <View style={styles.inline}>
        <RadioButton.Android value={5} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
      </View>
      <View style={styles.inline}>
        <RadioButton.Android value={4} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
      </View>
      <View style={styles.inline}>
        <RadioButton.Android value={3} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
      </View>
      <View style={styles.inline}>
        <RadioButton.Android value={2} />
        <Icon source={'star'} size={35} />
        <Icon source={'star'} size={35} />
      </View>
      <View style={styles.inline}>
        <RadioButton.Android value={1} />
        <Icon source={'star'} size={35} />
      </View>

      <Button onPress={() => {}}>Submit</Button>
    </RadioButton.Group>
  );
};

export default RateDriverScreen;

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignContent: 'center',
    // justifyContent: 'center',
  },
});
