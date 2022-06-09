import { AnyAction, combineReducers } from 'redux';
//import { AppState } from '@app/types/interface';
import { SharedReducer } from '@app/store/SharedStore/reducer';
import { BansReducer } from '@app/store/BansStore/reducer';

export default () => {
  const appReducer = combineReducers({
    shared: SharedReducer,
    bans: BansReducer,
  });

  return (state: /* AppState */any | undefined, action: AnyAction) => appReducer(state, action);
};
