import { createAsyncAction, createAction } from 'typesafe-actions';
import { IDomains, IUserData } from '@app/shared/interface';
import { MainActionTypes } from '@app/containers/Main/store/constants';

export const loadSomeData = createAction('@@MAIN/SET_BRIDGE_TRANSACTIONS')<any>();
export const setPkey = createAction(MainActionTypes.SET_USER_PKEY)<string>();
export const setUserData = createAction(MainActionTypes.SET_USER_DATA)<IUserData>();
export const setAllDomains = createAction(MainActionTypes.SET_ALL_DOMAINS)<IDomains[]>();
export const setIsAvailable = createAction(MainActionTypes.SET_AVAILABLE)<string>();

export const loadParams = createAsyncAction(
  MainActionTypes.LOAD_PARAMS,
  MainActionTypes.LOAD_PARAMS_SUCCESS,
  MainActionTypes.LOAD_PARAMS_FAILURE,
)<ArrayBuffer, any, any>();
export const getDomainName = createAsyncAction(
  MainActionTypes.GET_DOMAIN_NAME,
  MainActionTypes.GET_DOMAIN_NAME_SUCCESS,
  MainActionTypes.GET_DOMAIN_NAME_FAILURE,
)<string, any, any>();

export const loadRate = createAsyncAction(
  MainActionTypes.GET_RATE,
  MainActionTypes.GET_RATE_SUCCESS,
  MainActionTypes.GET_RATE_SUCCESS,
)<void, number, any>();
