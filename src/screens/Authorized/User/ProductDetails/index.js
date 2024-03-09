import {Image, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import globalStyle from 'src/styles/GlobalStyles';
import {Button, Text, Card, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from 'src/features/cart/cartSlice';
import {ImageSlider} from 'react-native-image-slider-banner';

const ProductDetails = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const route = useRoute();
  const [foundItem, setFoundItem] = useState('');

  const {item, otherParam} = route.params;
  console.log('ROUTE ==>', route.params);

  useEffect(() => {
    setFoundItem(selector.find(product => product.id === item.id));
  }, [selector]);

  return (
    <View flex={1} style={[globalStyle().centerView, styles.container]}>
      <Card mode={'contained'}>
        <ImageSlider
          data={item.imageURL.map(image => ({img: image}))}
          autoPlay={true}
          timer={3000}
          preview={false}
          onItemChanged={item => {}}
          closeIconColor="#fff"
        />
        <Card.Content style={globalStyle().centerView}>
          <Text variant="titleLarge">{item.title}</Text>
          <Text variant="bodyMedium">Price: ${item.price}</Text>
          <Text variant="bodyMedium">{item.description}</Text>
        </Card.Content>
        <Divider />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              dispatch(addToCart(item));
            }}>
            <Text variant="titleSmall">Add To Cart</Text>
          </Button>
          {foundItem && (
            <View style={globalStyle().centerView}>
              <Text>Item Quantity in Cart: {foundItem.quantity}</Text>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

export default ProductDetails;
const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    margin: 15,
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
