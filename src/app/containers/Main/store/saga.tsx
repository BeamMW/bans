import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { navigate, setIsLoaded } from '@app/shared/store/actions';
import { ROUTES } from '@app/shared/constants';
// import { LoadFromContract } from '@core/api';
import { selectIsLoaded } from '@app/shared/store/selectors';
import {
  GetUserKey, GetView, SearchDomain, UserView, ViewName, ViewParams,
} from '@core/api';
import {
  loadParams, LoadParams, setAllDomains, setPkey, setIsAvailable, setUserData, setParams, setRegistrationName, setRate,
} from '@app/containers/Main/store/actions';
import { IDomains, IParams, IUserData } from '@app/shared/interface';
import { calcRelayerFee } from '@core/appUtils';
import { CURRENCIES } from '@app/shared/constants/common';
import { actions } from '.';
import store from '../../../../index';

const FETCH_INTERVAL = 5000;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const RESERVE_API_URL = 'https://explorer-api.beam.mw/bridges/rates';
const GAS_API_URL = 'https://explorer-api.beam.mw/bridges/gasprice';

export function* loadParamsSaga(
  action: ReturnType<typeof actions.loadParams.request>,
): Generator {
  try {
    const params = yield call(ViewParams, action.payload ? action.payload : null);
    console.log(params);
    yield put(setRate(params.price));
    yield put(setParams(params as IParams));
    const pkey = yield call(GetUserKey, null);
    yield put(setPkey(pkey.key as string));
    // const userData = yield call(UserView as any);
    // yield put(setUserData(userData as IUserData));
    const allDomains = yield call(SearchDomain);
    yield put(actions.setAllDomains(allDomains as IDomains[]));
    const isLoaded = yield select(selectIsLoaded());
    if (!isLoaded) {
      store.dispatch(setIsLoaded(true));
      yield put(navigate(ROUTES.MAIN.MAIN_PAGE));
    }
  } catch (e) {
    yield put(actions.loadParams.failure(e));
  }
}
export function* getDomainName(action: ReturnType<typeof actions.getDomainName.request>): Generator {
  try {
    if (action.payload.length <= 2) {
      yield put(setIsAvailable('invalid domain'));
    }
    const name = yield call(ViewName, action.payload) as Object;
    if (name) {
      yield put(setIsAvailable('not available'));
    } else {
      yield put(setIsAvailable('available'));
      yield put(setRegistrationName(action.payload as string));
    }
  } catch (e) {
    yield put(actions.getDomainName.failure(e));
  }
}
async function loadRatesCached() {
  try {
    const response = await fetch(RESERVE_API_URL);
    if (response.status === 200) {
      const promise = await response.json();
      return promise;
    }

    return null;
  } catch (e) {
    return null;
  }
}
async function loadRatesApiCall(rate_ids) {
  try {
    const response = await fetch(`${API_URL}?ids=${rate_ids.join(',')}&vs_currencies=usd`);
    if (response.status === 200) {
      const promise = await response.json();
      return promise;
    }
    return await loadRatesCached();
  } catch (error) {
    return await loadRatesCached();
  }
}
interface GasPrice {
  FastGasPrice: string,
  LastBlock: string,
  ProposeGasPrice: string,
  SafeGasPrice: string,
  gasUsedRatio: string,
  suggestBaseFee: string
}

async function loadGasPrice() {
  const response = await fetch(GAS_API_URL);
  const gasPrice = await response.json();
  return gasPrice;
}

async function loadRelayerFee(ethRate: number, currFee: number, gasPrice: GasPrice) {
  const res = await calcRelayerFee(ethRate, currFee, gasPrice);
  return res;
}
export function* loadRate() {
  try {
    const rate_ids = [];
    CURRENCIES.forEach((curr) => {
      rate_ids.push(curr.rate_id);
    });
    rate_ids.push('beam');
    const result = yield call(loadRatesApiCall, rate_ids);
    const feeVals = {};
    const gasPrice = yield call(loadGasPrice);

    for (const item in result) {
      if (item === 'beam') {
        continue;
      }

      const feeVal = yield call(loadRelayerFee, result.ethereum.usd, result[item].usd, gasPrice);
      const curr = CURRENCIES.find((curr) => curr.rate_id === item);
      feeVals[item] = feeVal.toFixed(curr.fee_decimals);
    }
    // yield put(actions.setFeeValues(feeVals));
    yield put(actions.loadRate.success(result));
    setTimeout(() => store.dispatch(actions.loadRate.request()), FETCH_INTERVAL);
  } catch (e) {
    yield put(actions.loadRate.failure(e));
  }
}

function* mainSaga() {
  yield takeLatest(actions.loadParams.request, loadParamsSaga);
  yield takeLatest(actions.getDomainName.request, getDomainName);
  yield takeLatest(actions.loadRate.request, loadRate);
}

export default mainSaga;
