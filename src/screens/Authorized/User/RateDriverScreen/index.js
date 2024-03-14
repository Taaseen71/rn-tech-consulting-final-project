import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Icon, RadioButton} from 'react-native-paper';
import {rateDriver} from 'src/helpers/FirebaseHelper';

const RateDriverScreen = () => {
  const route = useRoute();
  const {orders, orderNumber} = route.params;
  const [rating, setRating] = React.useState(0);
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('ORDER', rating, orderNumber, orders);
    rateDriver(orders, rating, orderNumber);
    navigation.goBack();
  };

  return (
    <RadioButton.Group
      onValueChange={newValue => setRating(newValue)}
      value={rating}>
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

      <Button onPress={handleSubmit}>Submit</Button>
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
