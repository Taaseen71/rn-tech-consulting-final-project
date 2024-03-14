import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, Card} from 'react-native-paper';
import React, {memo, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {fetchProducts} from 'src/helpers/DispatchHelpers';
import NotificationHelper, {
  useForegroundNotifications,
} from 'src/helpers/NotificationHelper';
import {useSelector} from 'react-redux';

const UserHomeScreen = memo(() => {
  const navigation = useNavigation();

  const {items, setItems, user} = fetchProducts();

  const renderItem = ({item}) => {
    return (
      <View flex={1}>
        <TouchableOpacity
          style={styles.centerView}
          onPress={() => {
            navigation.navigate('Product Details', {
              item: item,
              otherParam: 'anything you want here',
            });
          }}>
          <Card width={150}>
            <Card.Cover source={{uri: item.imageURL[0]}} />
            <Card.Content>
              <Text variant="titleSmall">{item.title}</Text>
              <Text variant="bodySmall">Price: ${item.price}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  const keyExtractor = item => item.id;

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />
    </SafeAreaView>
  );
});

export default UserHomeScreen;
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
