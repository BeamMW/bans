import { getGlobalApiProviderValue } from '@app/contexts/Bans/BansApiProvider';
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
    if(!getGlobalApiProviderValue) yield null;
    
    try {
      const result = yield call(getGlobalApiProviderValue.userMyKey);
      yield put(actions.loadPublicKey.success(result));
    } catch (e) {
      yield put(actions.loadPublicKey.failure(e));
    }
  });
}

export default sharedSaga;
