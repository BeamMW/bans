import { createAction, createAsyncAction } from "typesafe-actions";
 
export const setLoadedStatus = createAction('@@NOTIFICATIONS/SET_LOADED_NOTIFICATIONS/')<boolean>();

export const updateNotifications = createAsyncAction(
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS',
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS_SUCCESS',
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS_FAILURE',
)<void, number, any>();