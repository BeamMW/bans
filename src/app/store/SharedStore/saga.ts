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

import { LoadAdminKey } from '@app/core/api';

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

  yield takeLatest(actions.loadAdminKey.request, function* (action): Generator {
    try {
      const result = yield call(LoadAdminKey);
      yield put(actions.loadAdminKey.success(result));
    } catch (e) {
      yield put(actions.loadAdminKey.failure(e));
    }
  });
}

export default sharedSaga;
