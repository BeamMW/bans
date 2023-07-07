import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { MainStateType } from '@app/shared/interface';
// import { Decimal } from '@core/Decimal';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState: MainStateType = {
  pkey: null,
  userData: null,
  allDomains: null,
  isAvailable: null,
  assetPrice: 0,
};

const reducer = createReducer<any, Action>(initialState)
  .handleAction(actions.loadSomeData, (state, action) => produce(state, (nexState) => {
    nexState.someData = action.payload;
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
  }));
export { reducer as MainReducer };
