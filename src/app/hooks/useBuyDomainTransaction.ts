import { useCallback } from 'react';
import { useBansApi } from '@app/contexts/Bans/BansContexts';
import { useTransactionFunction } from '@app/library/transaction-react/useTransactionFunction';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';

export const DOMAIN_BUYING_TX_ID = 'DOMAIN_BUYING';

/**
 * Same contract path as {@link RegisterAction} `buyDomain`; used when skipping the Attention modal.
 */
export function useBuyDomainTransaction(domain: DomainPresenterType | null | undefined) {
    const { registeredMethods } = useBansApi();
    const send = useCallback(() => {
        if (!domain?.name) return Promise.resolve(undefined);
        return registeredMethods.userDomainBuy({ name: domain.name });
    }, [domain?.name, registeredMethods]);
    return useTransactionFunction(DOMAIN_BUYING_TX_ID, send);
}
