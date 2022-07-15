import React, { useEffect } from 'react';
import { Box, Paragraph } from 'theme-ui';
import store from 'index';
import { Modal } from '@app/components/Modals/Modal';

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { SellBansAction } from '@app/views/Actions/SellBansAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';
import RemoveIcon from '@app/assets/icons/remove-sale.svg';

interface RemoveProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}
export const RemoveModal: React.FC<RemoveProps> = ({ isShown, closeModal }) => {

  if(!isShown) return <></>;

  const { close, data: {domain: domain} }: {close: any, data: {domain: DomainPresenterType}} = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "DOMAIN_REMOVE_FROM_SALE";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      closeModal(null);
      store.dispatch(reloadAllUserInfo.request());
      return () => {
        
      }
    }

  }, [transactionState]);


  return (
    <Modal isShown={isShown} header="Remove from sale">
      <>
        {isTransactionPending && <LoadingOverlay />}
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>Are you sure you want to remove domain {domain.name}.beam from sale?</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={closeModal} />
          <SellBansAction
            transactionId={TRANSACTION_ID}
            change={"sellBans"}
            domain={domain}
          >
            <RemoveIcon />
            remove
          </SellBansAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}