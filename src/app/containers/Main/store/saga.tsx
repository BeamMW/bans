import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { navigate, setIsLoaded } from '@app/shared/store/actions';
import { ROUTES } from '@app/shared/constants';
// import { LoadFromContract } from '@core/api';
import { selectIsLoaded } from '@app/shared/store/selectors';
import {
  GetUserKey, GetView, SearchDomain, UserView, ViewName,
} from '@core/api';
import {
  loadParams, LoadParams, setAllDomains, setPkey, setIsValid, setUserData,
} from '@app/containers/Main/store/actions';
import { IDomains, IUserData } from '@app/shared/interface';
import { actions } from '.';
import store from '../../../../index';

export function* loadParamsSaga(
  action: ReturnType<typeof actions.loadParams.request>,
): Generator {
  try {
    const pkey = yield call(GetUserKey, action.payload ? action.payload : null);
    yield put(setPkey(pkey as string));
    const userData = yield call(UserView as any);
    yield put(setUserData(userData as IUserData));
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
    const name = yield call(ViewName, action.payload) as Object;
    if (name) {
      yield put(setIsValid(false));
    } else {
      yield put(setIsValid(true));
    }
  } catch (e) {
    yield put(actions.getDomainName.failure(e));
  }
}

function* mainSaga() {
  yield takeLatest(actions.loadParams.request, loadParamsSaga);
  yield takeLatest(actions.getDomainName.request, getDomainName);
}

export default mainSaga;
