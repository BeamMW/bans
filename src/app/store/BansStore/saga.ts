import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { CID } from '@app/constants';

import { actions } from '.';
import store from '../../../index';

import {
  setIsLoaded,
  navigate,
  setError,
  loadAdminKey,
} from '@app/store/SharedStore/actions';
import { Base64DecodeUrl, fromGroths } from '@app/library/base/appUtils';
import { Decimal } from '@app/library/base/Decimal';
import ShaderApi from '@app/library/base/api/ShaderApi';

const FETCH_INTERVAL = 310000;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const RATE_PARAMS = 'ids=beam&vs_currencies=usd';

export function* handleParams(payload: any) {
  yield put(actions.setAppParams(payload));
}

export function* loadParamsSaga(
  action: ReturnType<typeof actions.loadAppParams.request>,
): Generator {
  try {
    
    const bansShaderBytes = action.payload ??
      ShaderApi.useShaderStore.retriveShader("6f0e4ccfff83fceef99a7eb07b79d71f5994f46cae94d87d973afc4712d8fbb4").shaderData;

    const state = (yield select()) as { nephrite; shared };

    if (!state.shared.isLoaded && !action.payload) {
      yield null;
    }

    const result = yield call(
      LoadViewParams,
      action.payload ? action.payload : null,
    );

    yield put(actions.loadAppParams.success(result));

    store.dispatch(actions.loadContractInfo.request());
    store.dispatch(actions.loadOpenTroves.request());

    yield call(loadUserViewSaga);

    if (state.shared.isLoaded) {
      store.dispatch(loadAdminKey.request());
    }
  } catch (e) {
    console.log(e);
    yield put(actions.loadAppParams.failure(e));
  }
}

export function* loadContractInfoSaga(
  action: ReturnType<typeof actions.loadContractInfo.request>,
): Generator {
  try {
    const managerViewData = (yield call(
      LoadManagerView,
    )) as any; /* ManagerViewData */

    const contract = managerViewData.contracts.find(item => item.cid === CID);
    if (contract) {
      yield put(actions.loadContractInfo.success(contract /* .Height */));
    }
  } catch (e) {
    yield put(actions.loadContractInfo.failure(e));
  }
}

function* loadUserViewSaga(
  action?: ReturnType<typeof troveActions.loadUserTrove.request>,
) {
  const userView = (yield call(LoadUserView)) as any; /* UserViewParams */
  yield put(actions.setUserView(userView));

  yield call(updateUserTroveSaga, userView);
  yield call(updateUserStabilityDepositSaga, userView);
}

async function loadRatesApiCall() {
  const response = await fetch(`${API_URL}?${RATE_PARAMS}`);
  const promise /* : RateResponse */ = await response.json();
  return promise.beam.usd;
}

export function* loadRate() {
  try {
    yield put(actions.loadRate.success(0.3));

    const result: number = yield call(loadRatesApiCall);
    yield put(actions.loadRate.success(result));
    setTimeout(
      () => store.dispatch(actions.loadRate.request()),
      FETCH_INTERVAL,
    );
  } catch (e) {
    //yield put(actions.loadRate.success(0.3));
    yield put(actions.loadRate.failure(e));
  }
}

function* mainSaga() {
  yield takeEvery(actions.loadAppParams.request, loadParamsSaga);
  yield takeLatest(actions.loadContractInfo.request, loadContractInfoSaga);
  yield takeLatest(actions.loadRate.request, loadRate);
}

export default mainSaga;
