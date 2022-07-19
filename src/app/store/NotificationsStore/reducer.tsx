import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Decimal } from '@app/library/base/Decimal';
import _ from "lodash";

type Action = ActionType<typeof actions>;

const initialState = {
  setIsNotificationsLoaded: false,
  queue: []
};

const reducer = createReducer<any, Action>(
  initialState,
)
  .handleAction(actions.setLoadedStatus, (state, action) =>
    produce(state, nextState => {
      nextState.setIsNotificationsLoaded = action.payload;
    }),
  )
  .handleAction(actions.updateNotifications.success, (state, action) =>
    produce(state, nextState => {
      nextState.queue = action.payload;
    }),
  )
  ;

export { reducer as NotificationsReducer };
