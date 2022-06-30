import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Decimal } from '@app/library/base/Decimal';

type Action = ActionType<typeof actions>;

const initialState = {
    fees: (Decimal.ZERO),
    appParams: {
    },
    contract: {
      
    },
    //currentCurrency: "beam",
    total: Decimal.ZERO,

    is_moderator: false,
    public_key: '',
    contractHeight: 0,
    userView: false,
    allFavoritesBans: [],
    setIsFavoriteLoaded: false
};

const reducer = createReducer<any, Action>(
  initialState,
)
  .handleAction(actions.setUserView, (state, action) =>
    produce(state, nextState => {
      nextState.userView = action.payload ? action.payload.my_trove : false;
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
      nextState.appParams = {...action.payload, tcr: Decimal.from(action.payload.tcr ? action.payload.tcr : 0)};
    }),
  )
  .handleAction(actions.loadUserBans.success, (state, action) =>
    produce(state, nextState => {
      nextState.troves = action.payload;
    }),
  )
  .handleAction(actions.loadRate.success, (state, action) =>
    produce(state, nextState => {
      nextState.assetPrice = Decimal.from(action.payload);
    }),
  )
  .handleAction(actions.loadContractInfo.success, (state, action) =>
    produce(state, nextState => {
      nextState.contract/* Height */ = action.payload;
      nextState.contractHeight/* Height */ = action.payload.Height;
    }),
  )
  .handleAction(actions.loadAllFavoritesBans.success, (state, action) =>
    produce(state, nextState => {
      nextState.allFavoritesBans =
        action.payload;
    }),
  )
  .handleAction(actions.setIsFavoriteLoaded, (state, action) =>
    produce(state, nextState => {
      nextState.isFavoriteLoaded =
        action.payload;
    }),
  );

export { reducer as BansReducer };
