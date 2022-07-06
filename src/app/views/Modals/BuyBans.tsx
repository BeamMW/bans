import React, { useEffect } from 'react';
import { Box, Paragraph } from 'theme-ui';

import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { Modal } from '@app/components/Modals/Modal';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { RegisterAction } from '@app/views/Register/RegisterAction';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import ArrowRight from '@app/assets/icons/arrow-right.svg'
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import store from 'index';
import { loadAllFavoritesBans } from '@app/store/BansStore/actions';

interface ResultForSaleProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}
export const BuyBans: React.FC<ResultForSaleProps> = ({ isShown, closeModal }) => {

  if(!isShown) return <></>;

  const { close, data: {domain: domain} }: {close: any, data: {domain: DomainPresenterType}} = useModalContext();

  closeModal = closeModal ?? close;

  if(!domain) return <></>;

  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      /* @TODO: refactor - load only specific domains */store.dispatch(loadAllFavoritesBans.request());

      closeModal(null);

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);

  return (
    <Modal isShown={isShown} header="Attention">
      <>
        {isTransactionPending && <LoadingOverlay />}
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>You are going to buy a BANS with the set expiration period - {domain.expiresAt}. </Paragraph>
          <Paragraph sx={{ textAlign: 'center' }}>You will need to renew your subscription before the expiring date.</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={closeModal} text="cancel" />
          <RegisterAction
            transactionId={TRANSACTION_ID}
            change={"buyDomain"}
            domain={domain}
          >
            <ArrowRight />
            continue
          </RegisterAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}