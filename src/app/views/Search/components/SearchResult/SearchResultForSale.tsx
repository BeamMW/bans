import React, { useEffect } from 'react';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';
import ArrowRight from '../../../../assets/icons/arrow-right.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import { RegisterAction } from '@app/views/Register/RegisterAction';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import { LoadingOverlay } from '@app/components/LoadingOverlay';

interface ResultForSaleProps {
  isShown: boolean;
  toggleClose: () => void;
}
export const SearchResultForSale: React.FC<ResultForSaleProps> = ({ isShown, toggleClose }) => {
  const {foundDomain, setFoundDomain, setCurrentView} = useMainView();

  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({transactionIdPrefix: TRANSACTION_ID});

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      //dispatch to the main search view and clear found domain data
      toggleClose(), /* setCurrentView("REGISTER_COMPLETED") && */ setFoundDomain(null);

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState, setCurrentView]);

  return (
    <Modal isShown={isShown} header="Attention">
      <>
        {isTransactionPending && <LoadingOverlay />}
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>You are going to buy a BANS with the set expiration period - {foundDomain.expiresAt}. </Paragraph>
          <Paragraph sx={{ textAlign: 'center' }}>You will need to renew your subscription before the expiring date.</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={toggleClose} text="cancel" />
          <RegisterAction
            transactionId={TRANSACTION_ID}
            change={"buyDomain"}
            domain={foundDomain}
            isPure={true}
          >
            <ArrowRight />
            continue
          </RegisterAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}