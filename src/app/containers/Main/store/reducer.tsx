import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { MainStateType } from '@app/shared/interface';
// import { Decimal } from '@core/Decimal';
import * as actions from './actions';
import {setRate, setRegistrationName} from './actions';

type Action = ActionType<typeof actions>;

const initialState: MainStateType = {
  pkey: null,
  userData: null,
  allDomains: null,
  isAvailable: null,
  assetPrice: 0,
  params: null,
  registrationName: null,
  rate: 0
};

const reducer = createReducer<any, Action>(initialState)
  .handleAction(actions.setParams, (state, action) => produce(state, (nexState) => {
    nexState.params = action.payload;
  }))
  .handleAction(actions.setUserData, (state, action) => produce(state, (nexState) => {
    nexState.userData = action.payload;
  }))
  .handleAction(actions.setPkey, (state, action) => produce(state, (nexState) => {
    nexState.pkey = action.payload;
  }))
  .handleAction(actions.setAllDomains, (state, action) => produce(state, (nexState) => {
    nexState.allDomains = action.payload;
  }))
  .handleAction(actions.setIsAvailable, (state, action) => produce(state, (nexState) => {
    nexState.isAvailable = action.payload;
  }))
  .handleAction(actions.loadRate.success, (state, action) => produce(state, (nextState) => {
    nextState.assetPrice = action.payload;
  }))
  .handleAction(setRegistrationName, (state, action) => produce(state, (nextState) => {
    nextState.registrationName = action.payload;
  }))
.handleAction(setRate, (state, action) => produce(state, (nextState) => {
    nextState.rate = action.payload;
  }));
export { reducer as MainReducer };
