import { createAsyncAction, createAction } from 'typesafe-actions';
import React from 'react';

export const setAppParams = createAction('@@MAIN/SET_PARAMS')<any/*  */>();
export const setUserView = createAction('@@MAIN/SET_USER_VIEW')<any/*  */>();
export const setIsModerator = createAction('@@MAIN/SET_IS_MODERATOR')<boolean>();
export const setPublicKey = createAction('@@MAIN/SET_PUBLIC_KEY')<string>();
export const setProposalsState = createAction('@@MAIN/SET_PROPOSALS_STATE')<{ is_active: boolean, type: string }>();
export const setPopupState = createAction('@@MAIN/SET_POPUP_STATE')<{ type: string, state: boolean }>();
export const setIsFavoriteLoaded = createAction('@@MAIN/SET_IS_FAVORITE_LOADED')<boolean>();

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

export const loadUserBans = createAsyncAction(
    '@@MAIN/LOAD_USER_BANS',
    '@@MAIN/LOAD_USER_BANS_SUCCESS',
    '@@MAIN/LOAD_USER_BANS_FAILURE',
)<void, any, any>();

export const loadRate = createAsyncAction(
    '@@MAIN/GET_RATE',
    '@@MAIN/GET_RATE_SUCCESS',
    '@@MAIN/GET_RATE_FAILURE',
)<void, number, any>();

export const loadAllFavoritesBans = createAsyncAction(
    '@@MAIN/LOAD_ALL_FAVORITES_BANS',
    '@@MAIN/LOAD_ALL_FAVORITES_BANS_SUCCESS',
    '@@MAIN/LOAD_ALL_FAVORITES_BANS_FAILURE',
)<void, any, any>();  