import { createAsyncAction, createAction } from 'typesafe-actions';
import React from 'react';

export const setAppParams = createAction('@@MAIN/SET_PARAMS')<any/*  */>();
export const setUserView = createAction('@@MAIN/SET_USER_VIEW')<any/*  */>();
export const setIsModerator = createAction('@@MAIN/SET_IS_MODERATOR')<boolean>();
export const setPublicKey = createAction('@@MAIN/SET_PUBLIC_KEY')<string>();
export const setProposalsState = createAction('@@MAIN/SET_PROPOSALS_STATE')<{ is_active: boolean, type: string }>();
export const setPopupState = createAction('@@MAIN/SET_POPUP_STATE')<{ type: string, state: boolean }>();
export const setIsFavoriteLoaded = createAction('@@MAIN/SET_IS_FAVORITE_LOADED')<boolean>();
export const setUserDomains = createAction('@@MAIN/SET_USER_DOMAINS')<Array<any>>();
export const setUserFunds = createAction('@@MAIN/SET_USER_FUNDS')<any>();

export const loadAppParams = createAsyncAction(
    '@@MAIN/LOAD_PARAMS',
    '@@MAIN/LOAD_PARAMS_SUCCESS',
    '@@MAIN/LOAD_PARAMS_FAILURE',
)<void, any, any>();

export const loadContractInfo = createAsyncAction(
    '@@MAIN/LOAD_CONTRACT_INFO',
    '@@MAIN/LOAD_CONTRACT_INFO_SUCCESS',
    '@@MAIN/LOAD_CONTRACT_INFO_FAILURE',
)<void, number, any>();

export const loadUserView = createAsyncAction(
    '@@MAIN/LOAD_USER_VIEW',
    '@@MAIN/LOAD_USER_VIEW_SUCCESS',
    '@@MAIN/LOAD_USER_VIEW_FAILURE',
)<void, any, any>();

export const loadRate = createAsyncAction(
    '@@MAIN/GET_RATE',
    '@@MAIN/GET_RATE_SUCCESS',
    '@@MAIN/GET_RATE_FAILURE',
)<void, number, any>();

export const loadAllFavoritesDomains = createAsyncAction(
    '@@MAIN/LOAD_ALL_FAVORITES_DOMAINS',
    '@@MAIN/LOAD_ALL_FAVORITES_DOMAINS_SUCCESS',
    '@@MAIN/LOAD_ALL_FAVORITES_DOMAINS_FAILURE',
)<void, any, any>();

export const updateSpecificFavoritesDomains = createAsyncAction(
    '@@MAIN/UPDATE_FAVORITES_DOMAINS',
    '@@MAIN/UPDATE_FAVORITES_DOMAINS_SUCCESS',
    '@@MAIN/UPDATE_FAVORITES_DOMAINS_FAILURE',
)<Array<string>, any, any>();

export const loadPublicKey = createAsyncAction(
    '@@MAIN/LOAD_PUBLIC_KEY',
    '@@MAIN/LOAD_PUBLIC_KEY_SUCCESS',
    '@@MAIN/LOAD_PUBLIC_KEY_FAILURE',
)<void, any, any>();


export const reloadAllUserInfo = createAsyncAction(
    '@@MAIN/RELOAD_ALL_USER_INFO',
    '@@MAIN/RELOAD_ALL_USER_INFO_SUCCESS',
    '@@MAIN/RELOAD_ALL_USER_INFO_FAILURE',
)<void, any, any>();
