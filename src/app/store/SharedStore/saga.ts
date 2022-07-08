import { BANS_CID } from '@app/constants';
import { getGlobalApiProviderValue } from '@app/contexts/Bans/BansApiProvider';
import methods from '@app/library/bans/methods';
import ShaderApi from '@app/library/base/api/ShaderApi';
import { getBansApi } from '@app/utils/getBansApi';
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
}

export default sharedSaga;
