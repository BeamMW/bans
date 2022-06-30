import { call, put, takeLatest, select, takeEvery, getContext } from 'redux-saga/effects';
import { CID } from '@app/constants';
import { getGlobalApiProviderValue } from '@app/contexts/Bans/BansApiProvider';

import { actions } from '.';
import store from '../../../index';
import _ from 'lodash';

import {
  setIsLoaded,
  navigate,
  setError,
  loadPublicKey,
} from '@app/store/SharedStore/actions';
import { Base64DecodeUrl, fromGroths } from '@app/library/base/appUtils';
import { Decimal } from '@app/library/base/Decimal';
import ShaderApi from '@app/library/base/api/ShaderApi';
import methods from '@app/library/bans/methods';
import { useEffect, useState } from 'react';
import { readAllFavoriteBans } from '@app/library/bans/userLocalDatabase/dao/userFavorites';
import { getDomainPresentedData } from '@app/library/bans/DomainPresenter';

const FETCH_INTERVAL = 310000;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const RATE_PARAMS = 'ids=beam&vs_currencies=usd';

export function* handleParams(payload: any) {
  yield put(actions.setAppParams(payload));
}


const getBansApi = () => {
  let bansApi;

  bansApi = !_.isEmpty(getGlobalApiProviderValue()) ? getGlobalApiProviderValue() : (() => {
    const bansShader = ShaderApi.useShaderStore.retriveShader("a4733a5eb63b9ea8a3831d95ce26144a69e5a3fc48a881b2362be7de860f2956")
    const bansApi = new ShaderApi(bansShader, methods);

    return bansApi.getRegisteredMethods();
  })()

  return bansApi;
}

const fetchBansFromShader = async (bans: Array<string>) => {
  const bandApiMethods: any/* ShaderActions */ = getBansApi();

  return Promise.all(await bans.map(async (domain) => {
    const response = await bandApiMethods.managerViewName({ name: domain });
    return { ...response, ...{ searchName: domain } };
  }, []));
}


export function* loadParamsSaga(
  action: ReturnType<typeof actions.loadAppParams.request>,
): Generator {
  try {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();


    /* const resultUserViewParams = yield call(
      bandApiMethods.managerViewDomain
    );

    yield put(actions.loadAppParams.success(resultUserViewParams)); */

    const state = (yield select()) as { bans; shared };

    if (!state.shared.isLoaded && _.isEmpty(bandApiMethods)) {
      yield null;
    }


    store.dispatch(actions.loadContractInfo.request());
    store.dispatch(actions.loadUserBans.request());
    store.dispatch(loadPublicKey.request());

    if (Array.isArray(state.bans.allFavoritesBans) && !state.bans.allFavoritesBans.length) {
      store.dispatch(actions.loadAllFavoritesBans.request());
    }

    if (!state.shared.isLoaded) {
      store.dispatch(setIsLoaded(true));
    }

  } catch (e) {
    console.log(e);
    yield put(actions.loadAppParams.failure(e));
  }
}

export function* loadAllFavoritesBansSaga(
  action: ReturnType<typeof actions.loadAllFavoritesBans.request>
) {
  try {
    const state = (yield select()) as { shared };

    const {
      systemState: { current_height: currentStateHeight },
      systemState: { current_state_timestamp: currentStateTimestamp },
      publicKey
    } = state.shared;

    if (!(currentStateHeight && currentStateTimestamp /* && publicKey */))
      return false;

    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    const allFavoritesBans = yield call(readAllFavoriteBans);
    const allFavoritesBansPrepare = yield call(fetchBansFromShader, allFavoritesBans.map(bans => bans.bansName))

    const allFavoritesBansToDomainPresenter = allFavoritesBansPrepare.map((bans) =>
      getDomainPresentedData(bans, currentStateHeight, currentStateTimestamp, publicKey));
    yield put(actions.loadAllFavoritesBans.success(allFavoritesBansToDomainPresenter));
    yield put(actions.setIsFavoriteLoaded(true))
  } catch (e) {
    console.log(e);
    yield put(actions.loadAllFavoritesBans.failure(e));
  }

}

export function* loadUserBansSaga(
  action: ReturnType<typeof actions.loadUserBans.request>
) {
  try {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    const resultUserViewParams = yield call(
      bandApiMethods.userView
    );

    yield put(actions.loadUserBans.success(resultUserViewParams));

  } catch (e) {
    console.log(e);
    yield put(actions.loadUserBans.failure(e));
  }

}

export function* loadContractInfoSaga(
  action: ReturnType<typeof actions.loadContractInfo.request>,
): Generator {
  try {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    const managerViewParams = (yield call(
      bandApiMethods.managerView,
    )) as any; /* ManagerViewData */

    const contract = managerViewParams.contracts.find(item => item.cid === CID);
    if (contract) {
      yield put(actions.loadContractInfo.success(contract /* .Height */));
    }
  } catch (e) {
    yield put(actions.loadContractInfo.failure(e));
  }
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

function* bansSaga() {
  yield takeEvery(actions.loadAppParams.request, loadParamsSaga);
  yield takeEvery(actions.loadUserBans.request, loadUserBansSaga);
  yield takeLatest(actions.loadContractInfo.request, loadContractInfoSaga);
  yield takeLatest(actions.loadRate.request, loadRate);
  yield takeLatest(actions.loadAllFavoritesBans.request, loadAllFavoritesBansSaga);
}

export default bansSaga;
