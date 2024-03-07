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
// import {useNavigation} from '@react-navigation/native';
// const navigation = useNavigation();
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from 'src/styles/GlobalStyles';
import {
  addToCart,
  placeOrder,
  removeFromCart,
} from 'src/features/cart/cartSlice';
import {Card} from 'react-native-paper';

const CartScreen = () => {
  const dispatch = useDispatch();
  const userCart = useSelector(state => state.cart);
  const userData = useSelector(state => state.user.userData);
  console.log('UserCartItems => ', userCart);

  const renderItem = ({item}) => {
    return (
      <SafeAreaView flex={1}>
        <TouchableOpacity style={styles.centerView}>
          <Card width={300} style={[globalStyle('space-around').inline]}>
            <Card.Cover style={styles.image} source={{uri: item.imageURL[0]}} />
            <View>
              <View style={globalStyle().inline}>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
              <View style={globalStyle().inline}>
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
            <View style={globalStyle().centerView}>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total: {item.quantity * item.price}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  const keyExtractor = item => item.id;

  const FooterCode = () => (
    <View>
      <View style={[styles.centerView, globalStyle('center').inline]}>
        <Text>Total:</Text>
        <Text>{userCart.total}</Text>
      </View>
      {userCart.total > 0 && (
        <Button
          title="Place Order"
          color="black"
          onPress={() => {
            dispatch(
              placeOrder({userData: userData, cartData: userCart.items}),
            );
          }}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView flex={1}>
      <View flex={1}>
        <FlatList
          data={userCart.items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <FooterCode />
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
    width: 300,
    height: 200,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
