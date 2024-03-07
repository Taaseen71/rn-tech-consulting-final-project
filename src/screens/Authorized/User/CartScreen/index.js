import {
  StyleSheet,
  View,
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
import {
  Button,
  Text,
  Card,
  Divider,
  Icon,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
              <View style={globalStyle().centerView}>
                <Text>{item.title}</Text>
                {/* <Text>{item.price}</Text> */}
              </View>
              <View style={globalStyle().inline}>
                <IconButton
                  icon="plus"
                  iconColor={'black'}
                  size={20}
                  onPress={() => dispatch(addToCart(item))}
                />
                <IconButton
                  icon="minus"
                  iconColor={'black'}
                  size={20}
                  onPress={() => dispatch(removeFromCart(item))}
                />
              </View>
            </View>
            <View style={globalStyle().centerView}>
              <Text variant="bodyMedium">Quantity: {item.quantity}</Text>
              <Text variant="bodyMedium">
                Total: {item.quantity * item.price}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  const keyExtractor = item => item.id;

  const FooterCode = () => (
    <View>
      <Divider />
      <View style={[styles.centerView, globalStyle('center').inline]}>
        <Text variant="titleSmall">Total:</Text>
        <Text variant="titleSmall">${userCart.total}</Text>
      </View>
      {userCart.total > 0 && (
        // <Button
        //   title="Place Order"
        //   color="black"
        //   onPress={() => {
        //     dispatch(
        //       placeOrder({userData: userData, cartData: userCart.items}),
        //     );
        //   }}
        // />
        <View style={globalStyle(15, 0).marginsAndPadding}>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={() => {
              navigation.navigate('CheckOut');
            }}>
            Check Out
          </Button>
        </View>
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
