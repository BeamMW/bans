import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Decimal } from '@app/library/nephrite/Decimal';
import { Trove } from '@app/library/nephrite';

type Action = ActionType<typeof actions>;

const initialState = {
    assetPrice: (Decimal.ZERO),
    numberOfTroves: 0,
    fees: (Decimal.ZERO),

    //@TODO: BEAM wallet do not provide balance throught web beam api!
    //accountBalance: Decimal.ZERO,
    //nephriteBalance: Decimal.ZERO,
    
    appParams: {
      tcr: Decimal.ZERO,
      tvl: Decimal.ZERO,
    },
    contract: {
      
    },
    //currentCurrency: "beam",
    troves: [],
    total: Decimal.ZERO,

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
      const {totals: {tok: deposit, col: collateral}} = action.payload;

      nextState.total = new Trove(Decimal.from(collateral), Decimal.from(deposit));
      nextState.appParams = {...action.payload, tcr: Decimal.from(action.payload.tcr ? action.payload.tcr : 0), nephritePrice: Decimal.from(action.payload.price)};
    }),
  )
  .handleAction(actions.loadOpenTroves.success, (state, action) =>
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

export { reducer as NephriteReducer };
