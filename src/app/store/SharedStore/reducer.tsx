import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import { SharedStateType } from '@app/types/interface';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState: SharedStateType = {
  errorMessage: null,
  systemState: {
    current_height: 0,
    current_state_hash: '',
    current_state_timestamp: 0,
    is_in_sync: false,
    prev_state_hash: '',
    tip_height: 0,
    tip_prev_state_hash: '',
    tip_state_hash: '',
    tip_state_timestamp: 0
  },
  transactions: [],
  isLoaded: false,
  dappVersion: {},
  adminKey: "",
};

const reducer = createReducer<SharedStateType, Action>(initialState)
  .handleAction(actions.loadAdminKey.success, (state, action) =>
    produce(state, nextState => {
      nextState.adminKey = action.payload.admin_key;
    }),
  )
  .handleAction(actions.setDappVersion, (state, action) => produce(state, (nextState) => {
    nextState.dappVersion = action.payload;
  }))
  .handleAction(actions.setTransactionsSuccess, (state, action) => produce(state, (nextState) => {
    nextState.transactions = state.transactions.length
      ? [...new Map([...state.transactions, ...action.payload].map((item) => [item.txId, item])).values()]
      : action.payload;
  }))
  .handleAction(actions.setError, (state, action) => produce(state, (nextState) => {
    nextState.errorMessage = action.payload;
  }))
  .handleAction(actions.setIsLoaded, (state, action) => produce(state, (nextState) => {
    nextState.isLoaded = action.payload;
  }))
  .handleAction(actions.setSystemState, (state, action) => produce(state, (nextState) => {
    nextState.systemState = action.payload;
  }));

export { reducer as SharedReducer };
