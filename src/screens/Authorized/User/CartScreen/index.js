import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from 'src/styles/GlobalStyles';
import {
  addToCart,
  placeOrder,
  removeFromCart,
} from 'src/features/cart/cartSlice';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.cart);
  console.log('SELECTOR', selector);

  const renderItem = ({item}) => {
    return (
      <SafeAreaView flex={1}>
        <TouchableOpacity
          style={styles.centerView}
          onPress={() => {
            navigation.navigate('Product Details', {
              item: item,
              otherParam: 'anything you want here',
            });
          }}>
          <View style={[globalStyle('space-around').inline]}>
            <Image style={styles.image} source={{uri: item.imageURL}} />
            <View>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
              <View>
                <Button
                  title={'+'}
                  onPress={() => {
                    dispatch(addToCart(item));
                  }}
                />
                <Button
                  title={'-'}
                  onPress={() => {
                    dispatch(removeFromCart(item));
                  }}
                />
              </View>
            </View>
            <View>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total: {item.quantity * item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  const keyExtractor = item => item.id;
  return (
    <SafeAreaView>
      <FlatList
        data={selector.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {/* <View style={[styles.centerView, globalStyle('center').inline]}>
        <Text>Total:</Text>
        <Text>{selector.total}</Text>
      </View> */}
      <Button
        title="Place Order"
        color="black"
        onPress={() => {
          dispatch(placeOrder());
          setTimeout(() => {
            navigation.navigate('Order Placed');
          }, 3000);
        }}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

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
