import { createAsyncAction, createAction } from 'typesafe-actions';
import {IDomains, IParams, IUserData} from '@app/shared/interface';
import { MainActionTypes } from '@app/containers/Main/store/constants';

export const setRate = createAction(MainActionTypes.SET_RATE)<number>();
export const setPkey = createAction(MainActionTypes.SET_USER_PKEY)<string>();
export const setUserData = createAction(MainActionTypes.SET_USER_DATA)<IUserData>();
export const setAllDomains = createAction(MainActionTypes.SET_ALL_DOMAINS)<IDomains[]>();
export const setIsAvailable = createAction(MainActionTypes.SET_AVAILABLE)<string>();
export const setParams = createAction(MainActionTypes.SET_PARAMS)<IParams>();
export const setRegistrationName = createAction(MainActionTypes.SET_REGISTRATION_NAME)<string>();
export const setUserDomains = createAction(MainActionTypes.SET_USER_DOMAINS)<IDomains[]>();


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


