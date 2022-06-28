import { all, fork } from 'redux-saga/effects';
import bansSaga from '@app/store/BansStore/saga';
import sharedSaga from '@app/store/SharedStore/saga';

const allSagas = [sharedSaga, bansSaga];

export default function* appSagas() {
  yield all(allSagas.map(fork));
}