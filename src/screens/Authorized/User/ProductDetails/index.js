import {Image, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {Button, Text, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from 'src/features/cart/cartSlice';

const ProductDetails = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const route = useRoute();
  const [foundItem, setFoundItem] = useState('');

  const {item, otherParam} = route.params;
  //   console.log('ROUTE ==>', route.params);

  useEffect(() => {
    setFoundItem(selector.find(product => product.id === item.id));
  }, [selector]);

  return (
    <View flex={1} style={globalStyle().centerView}>
      <Card mode={'contained'}>
        <Card.Cover style={styles.image} source={{uri: item.imageURL}} />
        <Card.Content>
          <Text variant="titleLarge">{item.title}</Text>
          <Text variant="bodyMedium">Price: ${item.price}</Text>
        </Card.Content>
      </Card>
      <View>
        {foundItem && <Text>Item Quantity in Cart: {foundItem.quantity}</Text>}
      </View>

      <Button
        onPress={() => {
          dispatch(addToCart(item));
        }}>
        <Text>Add To Cart</Text>
      </Button>
    </View>
  );
};

export default ProductDetails;
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
    width: 300,
    height: 500,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
