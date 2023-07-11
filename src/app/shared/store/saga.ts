import {
  call, take
} from 'redux-saga/effects';

import { eventChannel, END } from 'redux-saga';
import { actions as mainActions } from '@app/containers/Main/store/index';
import Utils from '@core/utils.js';
import store from '../../../index';

export function remoteEventChannel() {
  return eventChannel((emitter) => {
    Utils.initialize({
      appname: 'BEAM Bans',
      min_api_version: '6.2',
      headless: true,
      apiResultHandler: (error, result, full) => {
        console.log('api result data: ', result, full);
        if (!result.error) {
          emitter(full);
        }
      },
    }, (err) => {
      Utils.download('./app.wasm', (err, bytes) => {
        Utils.callApi(
          'ev_subunsub',
          { ev_txs_changed: true, ev_system_state: true },
          (error, result, full) => {
            if (result) {
              store.dispatch(mainActions.loadParams.request(bytes));
              store.dispatch(mainActions.loadRate.request());
            }
          },
        );
      });
    });

    const unsubscribe = () => {
      emitter(END);
    };

    return unsubscribe;
  });
}

function* sharedSaga() {
  const remoteChannel = yield call(remoteEventChannel);

  while (true) {
    try {
      const payload: any = yield take(remoteChannel);
      switch (payload.id) {
        case 'ev_system_state':
          store.dispatch(setSystemState(payload.result));
          store.dispatch(mainActions.loadParams.request(null));
          break;
        default:
          break;
      }
    } catch (err) {
      remoteChannel.close();
    }
  }
}

export default sharedSaga;
