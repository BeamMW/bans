import { createAction, createAsyncAction } from 'typesafe-actions';
import { SharedActionTypes } from './constants';
import {Transaction, TxsEvent} from "@library/base/transaction/types" 

export const navigate = createAction(SharedActionTypes.NAVIGATE)<string>();
export const setError = createAction(SharedActionTypes.SET_ERROR)<string | null>();

export const setSystemState = createAction('@@SHARED/SET_SYSTEM_STATE')<any/* SystemState */>();
export const setDappVersion = createAction('@@DAPP_VERSION/SET_DAPP_VERSION')<any>();
export const setIsLoaded = createAction('@@SHARED/SET_IS_LOADED')<boolean>();


export const setTransactionsRequest = createAction('@@TRANSACTIONS/SET_TRANSACTIONS_REQUEST')<Transaction[]>();
export const setTransactionsSuccess = createAction('@@TRANSACTIONS/SET_TRANSACTIONS_SUCCESS')<Transaction[]>();
export const setTransactionsFailure = createAction('@@TRANSACTIONS/SET_TRANSACTIONS_FAILURE')<any>();


export const loadPublicKey = createAsyncAction(
    '@@SHARED/LOAD_PUBLIC_KEY',
    '@@SHARED/LOAD_PUBLIC_KEY_SUCCESS',
    '@@SHARED/LOAD_PUBLIC_KEY_FAILURE',
)<void, any, any>();