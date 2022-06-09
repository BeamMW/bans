import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Decimal } from '@app/library/bans/Decimal';

type Action = ActionType<typeof actions>;

const initialState = {
    assetPrice: (Decimal.ZERO),
    fees: (Decimal.ZERO),
    appParams: {
    },
    contract: {
      
    },
    is_moderator: false,
    public_key: '',
    contractHeight: 0,
    userView: false,
    totalsView: {
    },
    popupsState: {
    },
};

const reducer = createReducer<any, Action>(
  initialState,
)
  .handleAction(actions.setUserView, (state, action) =>
    produce(state, nextState => {
    }),
  )
  .handleAction(actions.setIsModerator, (state, action) =>
    produce(state, nextState => {
      nextState.is_moderator = action.payload;
    }),
  )
  .handleAction(actions.setPublicKey, (state, action) =>
    produce(state, nextState => {
      nextState.public_key = action.payload;
    }),
  )
  .handleAction(actions.loadAppParams.success, (state, action) =>
    produce(state, nextState => {
      const {totals: {tok: deposit, col: collateral}} = action.payload;

      nextState.appParams = {...action.payload, tcr: Decimal.from(action.payload.tcr ? action.payload.tcr : 0)};
    }),
  )
  .handleAction(actions.loadContractInfo.success, (state, action) =>
    produce(state, nextState => {
      nextState.contract/* Height */ = action.payload;
      nextState.contractHeight/* Height */ = action.payload.Height;
    }),
  )
  .handleAction(actions.setPopupState, (state, action) =>
    produce(state, nextState => {
      nextState.popupsState[action.payload.type] =
        action.payload.state;
    }),
  )
  /* .handleAction(actions.setCurrentCurrency, (state, action) =>
    produce(state, nextState => {
      nextState.currentCurrency =
        action.payload;
    }),
  ) */;

export { reducer as BansReducer };
