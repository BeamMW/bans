import { createAction, createAsyncAction } from "typesafe-actions";
 
export const setLoadedStatus = createAction('@@NOTIFICATIONS/SET_LOADED_NOTIFICATIONS/')<boolean>();

export const updateNotifications = createAsyncAction(
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS',
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS_SUCCESS',
    '@@NOTIFICATIONS/UPDATE_NOTIFICATIONS_FAILURE',
)<any, any, any>();

export const initNotifications = createAsyncAction(
    '@@NOTIFICATIONS/INIT_NOTIFICATIONS',
    '@@NOTIFICATIONS/INIT_NOTIFICATIONS_SUCCESS',
    '@@NOTIFICATIONS/INIT_NOTIFICATIONS_FAILURE',
)<any, any, any>();