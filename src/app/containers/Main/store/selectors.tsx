import { createSelector } from 'reselect';
import { AppState } from '../../../shared/interface';

const selectMain = (state: AppState) => state.main;

export const selectCurrentPrice = () => createSelector(selectMain, (state) => state.params.price);
export const selectIsAvailable = () => createSelector(selectMain, (state) => state.isAvailable);
export const selectRate = () => createSelector(selectMain, (state) => state.rate);
export const selectRegistrationName = () => createSelector(selectMain, (state) => state.registrationName);
export const selectPublicKey = () => createSelector(selectMain, (state) => state.pkey);
