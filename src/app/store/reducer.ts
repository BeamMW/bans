import { AnyAction, combineReducers } from 'redux';
import { AppState } from '@app/types/interface';

export default () => {
  const appReducer = combineReducers({
    
  });

  return (state: AppState | undefined, action: AnyAction) => appReducer(state, action);
};
