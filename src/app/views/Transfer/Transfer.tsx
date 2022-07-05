import React, { useEffect, useState } from 'react';
import { Modal } from '@app/components/Modals/Modal';
import ArrowRight from '@app/assets/icons/arrow-right.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import Input from '@app/components/Input';
import { TransferAction } from './TransferAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { useModalContext } from '@app/contexts/Modal/ModalContext';

interface TranferProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}
export const Transfer: React.FC<TranferProps> = ({ isShown, closeModal }) => {
  
  if(!isShown) return <></>;

  const { close, data: {domain: domain} }: {close: any, data: {domain: DomainPresenterType}} = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "DOMAIN_TRANSFERRING";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      closeModal(null);
      
      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);

  const [transferKey, setTransferKey] = useState<string>("");

  return (
    <Modal isShown={isShown} header="Transfer">
      <>
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>Paste the wallet address where you want to transfer this domain</Paragraph>
        </Box>
        <Box sx={{ mt: '20px', my: '30px' }}>
          <Input
            variant='proposal'
            pallete='white'
            onChange={(e) => setTransferKey(e.target.value)}
            value={transferKey}
            maxLength={66}
          />
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={closeModal} />
          <TransferAction
            transactionId={TRANSACTION_ID}
            change={"transferBans"}
            transferKey={transferKey}
            domain={domain}
          >
            <ArrowRight />
            Transfer
          </TransferAction>
        </ButtonContainer>
        {isTransactionPending && <LoadingOverlay />}
      </>
    </Modal>
  )
}