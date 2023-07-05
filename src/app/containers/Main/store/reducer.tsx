import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import { MainStateType } from '@app/shared/interface';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState: MainStateType = {
  pkey: null,
  userData: null,
  allDomains: null,
  isValid: false,
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
  .handleAction(actions.setIsValid, (state, action) => produce(state, (nexState) => {
    nexState.isValid = action.payload;
  }));
export { reducer as MainReducer };
