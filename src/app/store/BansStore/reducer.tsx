import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Decimal } from '@app/library/base/Decimal';
import _ from "lodash";

type Action = ActionType<typeof actions>;

const initialState = {
  assetPrice: (Decimal.ZERO),
  fees: (Decimal.ZERO),

  appParams: {
  },

  contract: {

  },
  
  //currentCurrency: "beam",

  is_moderator: false,
  contractHeight: 0,

  publicKey: null,

  userView: {
    domains: [],
    funds: {
      total: 0,
      revenue: [],
      transferred: [],
    }
  },
  setIsUserViewLoaded: false,
  allFavoritesDomains: [],
  setIsFavoriteLoaded: false,
};

const reducer = createReducer<any, Action>(
  initialState,
)
.handleAction(actions.loadPublicKey.success, (state, action) =>
    produce(state, nextState => {
      nextState.publicKey = action.payload.key;
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
      nextState.appParams = { ...action.payload, tcr: Decimal.from(action.payload.tcr ? action.payload.tcr : 0) };
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
  .handleAction(actions.loadAllFavoritesDomains.success, (state, action) =>
    produce(state, nextState => {
      nextState.allFavoritesDomains =
        action.payload;
    }),
  )
  .handleAction(actions.updateSpecificFavoritesDomains.success, (state, action) =>
    produce(state, nextState => {
      const updatedDomains = action.payload;
      const originalDomains = nextState.allFavoriteDomains;

      nextState.allFavoritesDomains = _.unionBy(updatedDomains, originalDomains, "name")
    }),
  )
  .handleAction(actions.setIsFavoriteLoaded, (state, action) =>
    produce(state, nextState => {
      nextState.isFavoriteLoaded =
        action.payload;
    }),
  )
  .handleAction(actions.setIsUserViewLoaded, (state, action) =>
    produce(state, nextState => {
      nextState.setIsUserViewLoaded =
        action.payload;
    }),
  )
  .handleAction(actions.setUserFunds, (state, action) =>
    produce(state, nextState => {
      nextState.userView.funds =
        action.payload;
    }),
  )
  .handleAction(actions.setUserDomains, (state, action) =>
    produce(state, nextState => {
      nextState.userView.domains = action.payload;
    }),
  );

export { reducer as BansReducer };
