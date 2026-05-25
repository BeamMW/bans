import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';
import store from 'index';
import { DOMAIN_BUYING_TX_ID } from './useBuyDomainTransaction';

/**
 * Mirrors SearchResultForSale / BuyBans side effects when the buy flow runs without opening those modals.
 */
export function useFavoriteDomainBuyingEffects() {
    const transactionState = useCurrentTransactionState(DOMAIN_BUYING_TX_ID);
    const navigate = useNavigate();

    useEffect(() => {
        if (transactionState.id !== DOMAIN_BUYING_TX_ID) return;

        if (transactionState.type === 'waitingForConfirmation') {
            navigate('my-page');
        }

        if (transactionState.type === 'completed') {
            store.dispatch(reloadAllUserInfo.request());
        }
    }, [transactionState, navigate]);
}
