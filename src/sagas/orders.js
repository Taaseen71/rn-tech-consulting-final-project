import {take, put, call, fork} from 'redux-saga/effects';
// take: wait for invocation. put: function self invoke
import {changeDeliveryStatus} from 'src/features/orders/orderSlice';
import {updateOrderStatus} from 'src/helpers/FirebaseHelper';

function callChangeOrderStatus(data) {
  //   return ApiHelper.get(url, data, headers);
  console.log('SAGA RESPONSE', data);
  updateOrderStatus(data);
}

function* watchRequest() {
  while (true) {
    const {payload} = yield take(changeDeliveryStatus); //Saga middleware listens for the command "changeDeliveryStatus" anywhere inside the app

    try {
      let response;

      response = yield call(callChangeOrderStatus, payload, {}); //Saga spits out response after running "request"
      //   yield put(success(response));
    } catch (ex) {
      //   yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
