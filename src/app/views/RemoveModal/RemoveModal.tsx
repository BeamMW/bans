import React, { useEffect } from 'react';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';
import RemoveIcon from '../../assets/icons/remove-sale.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import Input from '@app/components/Input';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { SellBansAction } from '../SellBans/SellBansAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { LoadingOverlay } from '@app/components/LoadingOverlay';

interface RemoveProps {
  isShown: boolean;
  toggleClose: () => void;
  domain: DomainPresenterType;
}
export const RemoveModal: React.FC<RemoveProps> = ({ isShown, toggleClose, domain }) => {
  const TRANSACTION_ID = "DOMAIN_REMOVE_FROM_SALE";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);


  return (
    <Modal isShown={isShown} header="Remove from sale">
      <>
        {isTransactionPending && <LoadingOverlay />}
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>Are you sure you want to remove domain batboy.beam from sale?</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={toggleClose} />
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