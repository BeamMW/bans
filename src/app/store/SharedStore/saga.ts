import { getGlobalApiProviderValue } from '@app/contexts/Bans/BansApiProvider';
import methods from '@app/library/bans/methods';
import ShaderApi from '@app/library/base/api/ShaderApi';
import {
  call,
  take,
  fork,
  takeLatest,
  put,
  select,
  takeEvery,
  getContext
} from 'redux-saga/effects';

import { actions } from './';

const getBansApi = () => {
  let bansApi;

  bansApi = !_.isEmpty(getGlobalApiProviderValue()) ? getGlobalApiProviderValue() : (() => {
    const bansShader = ShaderApi.useShaderStore.retriveShader("a4733a5eb63b9ea8a3831d95ce26144a69e5a3fc48a881b2362be7de860f2956")
    const bansApi = new ShaderApi(bansShader, methods);

    return bansApi.getRegisteredMethods();
  })()

  return bansApi;
}

function* sharedSaga() {
  yield takeEvery(actions.setTransactionsRequest, function* (action): Generator {
    try {
      const updatedTransactions = action.payload;
      
      console.log("Transaction update: ", updatedTransactions);

      yield put(actions.setTransactionsSuccess(updatedTransactions));

    } catch (e) {
      console.log(e)
      yield put(actions.setTransactionsFailure(e));
    }
  });

  yield takeLatest(actions.loadPublicKey.request, function* (action): Generator {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    if(!bandApiMethods) yield null;
    
    try {
      const result = yield call(bandApiMethods.userMyKey);
      yield put(actions.loadPublicKey.success(result));
    } catch (e) {
      yield put(actions.loadPublicKey.failure(e));
    }
  });
}

export default sharedSaga;
