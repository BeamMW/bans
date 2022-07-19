import { all, fork } from 'redux-saga/effects';
import bansSaga from '@app/store/BansStore/saga';
import sharedSaga from '@app/store/SharedStore/saga';
import notificationsSaga from './NotificationsStore/saga';

const allSagas = [sharedSaga, bansSaga, notificationsSaga];

export default function* appSagas() {
  yield all(allSagas.map(fork));
}