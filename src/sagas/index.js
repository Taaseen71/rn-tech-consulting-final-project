import {fork} from 'redux-saga/effects';
// import item from './item'
// import user from './user'
import orders from './orders';

export default function* rootSaga() {
  // yield fork(item)
  // yield fork(user)
  yield fork(orders);
}
