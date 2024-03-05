import {take, put, call, fork} from 'redux-saga/effects';
// take: wait for invocation. put: function self invoke
import {addToCart} from 'src/features/item/cart';
import ApiHelper from 'src/helpers/ApiHelper';

// function callGetRequest(url, data, headers = {}) {
//   return ApiHelper.get(url, data, headers);
// }

function* watchRequest() {
  while (true) {
    const {payload} = yield take(addToCart); //Saga middleware listens for the command "request" anywhere inside the app

    try {
      let response;
      // response = yield call(callGetRequest, payload.url, {}); //Saga spits out response after running "request"
      yield put(success(response));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
