import React, { useEffect } from 'react';
import { Box, Paragraph, Text } from 'theme-ui';

import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { Modal } from '@app/components/Modals/Modal';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { RegisterAction } from '@app/views/Actions/RegisterAction';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import ArrowRight from '@app/assets/icons/arrow-right.svg'

interface ResultForSaleProps {
  isShown: boolean;
  toggleClose: () => void;
  domain?: DomainPresenterType;
}
export const SearchResultForSale: React.FC<ResultForSaleProps> = ({ domain, isShown, toggleClose }) => {
  //@TODO:refactor this mess!
  const { foundDomain, setFoundDomain, setCurrentView } = !domain ? useMainView() : {
    foundDomain: domain,
    setFoundDomain: () => null,
    setCurrentView: () => null
  };

  if(!foundDomain) return <></>;

  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      toggleClose(), setFoundDomain(null);

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
          <Paragraph sx={{ textAlign: 'center' }}>You are going to buy a BANS with the set expiration period - <Text sx={{fontWeight: 700}}>{foundDomain.expiresAt}.</Text> </Paragraph>
          <Paragraph sx={{ textAlign: 'center' }}>You will need to renew your subscription before the expiring date.</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={toggleClose} text="cancel" />
          <RegisterAction
            transactionId={TRANSACTION_ID}
            change={"buyDomain"}
            domain={foundDomain}
          >
            <ArrowRight />
            continue
          </RegisterAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}