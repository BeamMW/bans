import { createSelector } from 'reselect';
import { AppState } from '../../../shared/interface';

const selectMain = (state: AppState) => state.main;

export const selectView = () => createSelector(selectMain, (state) => state.view);
export const selectIsValid = () => createSelector(selectMain, (state) => state.isValid);
