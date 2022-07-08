import { createSelector } from 'reselect';
import { AppState } from '@app/types/interface/State';

const selectMain = (state: AppState) => state.bans;

export const selectBansAppParams = () => createSelector(selectMain, (state) => state);

export const selectContractHeight = () => createSelector(selectMain, (state) => state.contractHeight);
//export const selectUserView = () => createSelector(selectMain, (state) => state.userView);
export const selectUserDomains = () => createSelector(selectMain, (state) => state.userView.domains);
export const selectTotalsView = () => createSelector(selectMain, (state) => state.totalsView);
export const selectIsModerator = () => createSelector(selectMain, (state) => state.is_moderator);

export const selectPrevProposals = () => createSelector(selectMain, (state) => state.proposals.prev);
export const selectCurrentProposals= () => createSelector(selectMain, (state) => state.proposals.current);
export const selectFutureProposals = () => createSelector(selectMain, (state) => state.proposals.future);
export const selectRate = () => createSelector(selectMain, (state) => state.assetPrice);
export const selectPopupsState = () => createSelector(selectMain, 
    (state) => state.popupsState);


export const selectFavoritesDomains = () => createSelector(selectMain, (state) => state.allFavoritesDomains);
export const selectIsFavoriteLoaded = () => createSelector(selectMain, (state) => state.isFavoriteLoaded);
export const selectFundsTotal = () => createSelector(selectMain, (state) => state.userView.funds.total);
export const selectPublicKey = () => createSelector(selectMain, (state) => state.publicKey);

