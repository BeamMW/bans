import { call, put, takeLatest, select, takeEvery, getContext, take, takeLeading, all } from 'redux-saga/effects';
import { BANS_CID } from '@app/constants';
import { getGlobalApiProviderValue } from '@app/contexts/Bans/BansApiProvider';

import { actions } from '.';
import store from '../../../index';
import _ from 'lodash';

import {
  setIsLoaded,
  navigate,
  setError,
} from '@app/store/SharedStore/actions';
import { Base64DecodeUrl, fromGroths } from '@app/library/base/appUtils';
import { Decimal } from '@app/library/base/Decimal';
import ShaderApi from '@app/library/base/api/ShaderApi';
import methods from '@app/library/bans/methods';
import { useEffect, useState } from 'react';
import { readAllFavoriteDomains } from '@app/library/bans/userLocalDatabase/dao/userFavorites';
import { getDomainPresentedData } from '@app/library/bans/DomainPresenter';
import { getBansApi } from '@app/utils/getBansApi';
import { action } from 'typesafe-actions';

const FETCH_INTERVAL = 310000;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const RATE_PARAMS = 'ids=beam&vs_currencies=usd';

export function* handleParams(payload: any) {
  yield put(actions.setAppParams(payload));
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

    if (!state.bans.publicKey) {
      yield call(loadPublicKeySaga, null)
      //store.dispatch(actions.loadPublicKey.request());
      store.dispatch(actions.loadContractInfo.request());
    }



    Array.isArray(state.bans.userView.domains) && !state.bans.userView.domains.length &&
      store.dispatch(actions.loadUserView.request());

    Array.isArray(state.bans.allFavoritesDomains) && !state.bans.allFavoritesDomains.length &&
      store.dispatch(actions.loadAllFavoritesDomains.request());

    if (!state.shared.isLoaded) {
      store.dispatch(setIsLoaded(true));
    }

  } catch (e) {
    console.log(e);
    yield put(actions.loadAppParams.failure(e));
  }
}

function* loadFavoritesRequestParams(): any {
  try {
    const state = (yield select()) as { shared; bans };

    const {
      systemState: { current_height: currentStateHeight },
      systemState: { current_state_timestamp: currentStateTimestamp },
    } = state.shared;

    const { publicKey } = state.bans;

    if (currentStateHeight && currentStateTimestamp && publicKey)
      return new Promise(resolve => [currentStateHeight, currentStateTimestamp, publicKey]);

  } catch (err) {
    throw new Error(err);
  }

}

export function* loadAllFavoritesDomainsSaga(
  action: ReturnType<typeof actions.loadAllFavoritesDomains.request>
) {
  try {
    //@TODO: remove duplicates
    const state = (yield select()) as { shared; bans };

    const {
      systemState: { current_height: currentStateHeight },
      systemState: { current_state_timestamp: currentStateTimestamp },
    } = state.shared;

    const { publicKey } = state.bans;

    const allFavoritesDomains = yield call(readAllFavoriteDomains);
    const allFavoritesDomainsPrepare = yield call(fetchBansFromShader, allFavoritesDomains.map(domain => domain.domainName))

    const allFavoritesDomainsToDomainPresenter = allFavoritesDomainsPrepare.map((rawDomain) =>
      getDomainPresentedData(rawDomain, currentStateTimestamp, currentStateHeight, publicKey));

    yield put(actions.loadAllFavoritesDomains.success(allFavoritesDomainsToDomainPresenter));
    yield put(actions.setIsFavoriteLoaded(true))
  } catch (e) {
    console.log(e);
    yield put(actions.loadAllFavoritesDomains.failure(e));
  }

}

export function* updateSpecificFavoritesDomains(
  action: ReturnType<typeof actions.updateSpecificFavoritesDomains.request>
) {
  try {

    if (!action.payload) return false;

    const specificFavoriteDomains: Array<string> = action.payload;

    const response = yield call(loadFavoritesRequestParams);

    const allFavoritesDomains = yield call(readAllFavoriteDomains);
    const updatedFavoritesDomainsPrepare = yield call(fetchBansFromShader, allFavoritesDomains.filter((bans) => {
      return specificFavoriteDomains.includes(bans.name);
    }))

    if (!updatedFavoritesDomainsPrepare.length) return false;

    const updatedFavoritesBansToDomainPresenter = updatedFavoritesDomainsPrepare.map((bans) =>
      getDomainPresentedData(bans, currentStateTimestamp, currentStateHeight, publicKey));

    yield put(actions.updateSpecificFavoritesDomains.success(updatedFavoritesBansToDomainPresenter));
  } catch (e) {
    console.log(e);
    yield put(actions.updateSpecificFavoritesDomains.failure(e));
  }

}

export function* loadUserViewSaga(
  action: ReturnType<typeof actions.loadUserView.request>
) {
  try {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    const resultUserViewParams = yield call(
      bandApiMethods.userView
    );

    const domains = "domains" in resultUserViewParams ? resultUserViewParams.domains : [];

    const funds = resultUserViewParams?.raw || resultUserViewParams?.anon ?
      { transferred: resultUserViewParams?.anon, revenue: resultUserViewParams?.raw } :
      false;

    /* store.dispatch(actions.setUserDomains(domains))
    store.dispatch(actions.setUserFunds(funds)) */
    yield call(setUserDomainsSaga, domains)

  } catch (err) {
    console.log(err);
    actions.loadUserView.failure(err);
  }
}

export function* setUserDomainsSaga(
  action//: ReturnType<typeof actions.setUserDomains>
) {
  try {
    if (!action/* .payload */.length) return false;

    let domains: Array<any> = action/* .payload */;
    const state = (yield select()) as { shared; bans };

    const {
      systemState: { current_height: currentStateHeight },
      systemState: { current_state_timestamp: currentStateTimestamp },
    } = state.shared;

    const { publicKey } = state.bans;

    domains = domains.map(domain => getDomainPresentedData(
      { ...domain, ...{ searchName: domain.name } },
      currentStateTimestamp,
      currentStateHeight,
      publicKey
    ));

    yield put(actions.setUserDomains(domains));

  } catch (e) {
    console.log(e);
    //yield put(actions.loadUserBans.failure(e));
  }

}

export function* setUserFundsSaga(
  action: ReturnType<typeof actions.setUserFunds>
) {
  try {
    const funds = action.payload;
    const total = [...funds.revenue, ...funds.transferred].reduce(
      (acc, current) => acc.add(current.amount)
      , Decimal.from(0));

    yield put(actions.setUserFunds({ total: total, ...action.payload }));

  } catch (e) {
    console.log(e)
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

    const contract = managerViewParams.contracts.find(item => item.cid === BANS_CID);
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

export function* loadPublicKeySaga(
  action: ReturnType<typeof actions.loadPublicKey.request>,
): Generator {
  try {
    const bandApiMethods: any/* ShaderActions */ = getBansApi();

    const response = yield call(bandApiMethods.userMyKey);

    if (response) {

      yield put(actions.loadPublicKey.success(response));

      /* store.dispatch(actions.loadUserView.request());
      store.dispatch(actions.loadAllFavoritesDomains.request()); */
    }

  } catch (e) {
    console.log(e);
    yield put(actions.loadPublicKey.failure(e))
  }
}

//@TODO: generator in antioptimized! remove in the future!
export function* reloadAllUserInfoSaga() {
  try {
    yield all([
      call(loadUserViewSaga, null),
      call(loadAllFavoritesDomainsSaga, null),
    ])
  } catch (e) {
    console.log(e);
  }
}

function* bansSaga() {
  yield takeEvery(actions.loadAppParams.request, loadParamsSaga);
  yield takeEvery(actions.loadUserView.request, loadUserViewSaga);
  yield takeLatest(actions.setUserDomains, setUserDomainsSaga);
  yield takeLatest(actions.setUserFunds, setUserFundsSaga);
  yield takeLatest(actions.loadContractInfo.request, loadContractInfoSaga);
  yield takeLatest(actions.loadRate.request, loadRate);
  yield takeLatest(actions.loadAllFavoritesDomains.request, loadAllFavoritesDomainsSaga);
  yield takeLatest(actions.updateSpecificFavoritesDomains.request, updateSpecificFavoritesDomains)
  yield takeLatest(actions.loadPublicKey.request, loadPublicKeySaga);

  // not optimized!
  yield takeEvery(actions.ANTIOPTIMIZEDreloadAllUserInfo.request, reloadAllUserInfoSaga);
}

export default bansSaga;
