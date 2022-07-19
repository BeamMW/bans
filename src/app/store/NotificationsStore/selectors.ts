import { createSelector } from "reselect";
import { AppState } from '@app/types/interface/State';

const selectNotificationsState = (state: AppState) => state.notifications;

export const selectNotifications = () => createSelector(selectNotificationsState, (state) => state.queue);
