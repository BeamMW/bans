import React, { useEffect } from 'react';
import { Box, Paragraph, Text } from 'theme-ui';
import store from 'index';
import { Modal } from '@app/components/Modals/Modal';

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { SellBansAction } from '@app/views/Actions/SellBansAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';
import RemoveBlueIcon from '@app/assets/icons/remove-blue.svg';

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
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForApproval") {
      closeModal(null);
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      store.dispatch(reloadAllUserInfo.request());

      return () => {}
    }

  }, [transactionState]);


  return (
    <Modal isShown={isShown} header="Remove from sale">
      <>
        <Box>
          <Paragraph sx={{ textAlign: 'center', fontFamily: 'SFProDisplay' }}>Are you sure you want to remove domain <Text sx={{ fontWeight: 700 }}>{domain.name}.beam</Text> from sale?</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={closeModal} text='cancel' width='16px' height='15px'/>
          <SellBansAction
            transactionId={TRANSACTION_ID}
            change={"sellBans"}
            domain={domain}
            disabled={isTransactionPending}
            pallete='red'
          >
            <RemoveBlueIcon style={{marginTop: '-1px',marginRight:'9px'}}/>
            <span style={{ color: '#042548' }}>remove</span>
          </SellBansAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}