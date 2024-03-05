import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Button, Icon, Menu, Divider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setProducts} from 'src/features/item/itemSlice';
// import HamburgerMenu from 'src/components/HamburgerMenu';
import data from './data.json';
import globalStyle from 'src/styles/GlobalStyles';
import {getProducts} from 'src/helpers/FirebaseHelper';
import {useDispatch} from 'react-redux';

const UserHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setItems(products);
      dispatch(setProducts(products));
    };
    fetchProducts();
  }, []);

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
          <Image style={styles.image} source={{uri: item.imageURL}} />
          <View style={[globalStyle('space-around').inline]}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
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
};

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
