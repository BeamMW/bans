import { createAsyncAction, createAction } from 'typesafe-actions';
import {IDomains, IUserData} from '@app/shared/interface';

export const loadSomeData = createAction('@@MAIN/SET_BRIDGE_TRANSACTIONS')<any>();
export const setPkey = createAction('@@MAIN/SET_USER_PKEY')<string>();
export const setUserData = createAction('@@MAIN/SET_USER_DATA')<IUserData>();
export const setAllDomains = createAction('@@MAIN/SET_ALL_DOMAINS')<IDomains[]>();
export const setIsValid = createAction('@@MAIN/SET_IS_VALID')<boolean>();

export const loadParams = createAsyncAction(
  '@@MAIN/LOAD_PARAMS',
  '@@MAIN/LOAD_PARAMS_SUCCESS',
  '@@MAIN/LOAD_PARAMS_FAILURE',
)<ArrayBuffer, any, any>();
export const getDomainName = createAsyncAction(
  '@@MAIN/GET_DOMAIN_NAME',
  '@@MAIN/GET_DOMAIN_NAME_SUCCESS',
  '@@MAIN/GET_DOMAIN_NAME_FAILURE',
)<string, any, any>();
