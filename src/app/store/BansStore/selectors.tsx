import { createSelector } from 'reselect';
import { AppState } from '@app/types/interface/State';

const selectBans = (state: AppState) => state.bans;

export const selectBansAppParams = createSelector(selectBans, (state) => state);
export const selectContractHeight = createSelector(selectBans, (state) => state.contractHeight);
export const selectUserView = createSelector(selectBans, (state) => state.userView);
export const selectUserDomains = createSelector(selectBans, (state) => state.userView.domains);
export const selectUserFunds = createSelector(selectBans, (state) => state.userView.funds);

export const selectRate = createSelector(selectBans, (state) => state.assetPrice);
export const selectPopupsState = createSelector(selectBans, (state) => state.popupsState);

export const selectFavoritesDomains = createSelector(selectBans, (state) => state.allFavoritesDomains);
export const selectIsFavoriteLoaded = createSelector(selectBans, (state) => state.isFavoriteLoaded);
export const selectFundsTotal = createSelector(selectBans, (state) => state.userView.funds.total);
export const selectFundsByAsset = createSelector(selectBans, (state) => state.userView.funds.byAsset ?? {});
export const selectPublicKey = createSelector(selectBans, (state) => state.publicKey);
