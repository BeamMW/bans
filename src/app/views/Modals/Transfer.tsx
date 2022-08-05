import React, { useEffect, useState } from 'react';
import { Modal } from '@app/components/Modals/Modal';
import ArrowRight from '@app/assets/icons/arrow-right.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import Input from '@app/components/Input';
import { TransferAction } from '@app/views/Actions/TransferAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import store from 'index';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';
import { ShaderTransactionComments } from '@app/library/bans/types';

interface TranferProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}
export const Transfer: React.FC<TranferProps> = ({ isShown, closeModal }) => {
  
  if(!isShown) return <></>;

  const { close, data: {domain: domain} }: {close: any, data: {domain: DomainPresenterType}} = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = `${ShaderTransactionComments.setDomainOwner} for ${domain.beautyName}`;
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

  const [transferKey, setTransferKey] = useState<string>("");

  return (
    <Modal isShown={isShown} header="Transfer">
      <>
        <Box>
          <Paragraph variant='text' sx={{textAlign: 'center' }}>Paste the Publisher key of the recipient of this domain</Paragraph>
        </Box>
        <Box sx={{ mt: '20px', my: '30px' }}>
          <Input
            variant='modalInput'
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
            disabled={isTransactionPending}
          >
            <ArrowRight />
            transfer
          </TransferAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}