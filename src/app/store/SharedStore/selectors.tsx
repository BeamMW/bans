import { createSelector } from 'reselect';

import { AppState } from '@app/types/interface';

const selectShared = (state: AppState) => state.shared;

export const selectSharedAppParams = () => createSelector(selectShared, (state) => state);

export const selectErrorMessage = () => createSelector(selectShared, (state) => state.errorMessage);
export const selectSystemState = () => createSelector(selectShared, (state) => state.systemState);
export const selectIsLoaded = () => createSelector(selectShared, (state) => state.isLoaded);
export const selectTransactions = () => createSelector(selectShared, (state) => state.transactions);
export const selectAdminKey = () => createSelector(selectShared, (state) => state.adminKey);
export const selectTransactionById = () => createSelector(
    [
        selectShared,
        (state, txId) => state.transactions
    ],
    (transactions, txId) => transactions.find((tx) => {
        return tx.txId === txId;
    })

);
