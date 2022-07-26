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
import { useSelector } from 'react-redux';
import { selectUserDomains } from '@app/store/BansStore/selectors';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';
import store from 'index';
import { useNavigate } from 'react-router-dom';

interface ResultForSaleProps {
  isShown: boolean;
  closeModal: () => void;
  domain?: DomainPresenterType;
}
export const SearchResultForSale: React.FC<ResultForSaleProps> = ({ domain, isShown, closeModal }) => {
  //@TODO:refactor this mess!
  const { foundDomain, setFoundDomain, setCurrentView } = !domain ? useMainView() : {
    foundDomain: domain,
    setFoundDomain: () => null,
    setCurrentView: () => null
  };

  if (!foundDomain) return <></>;

  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const navigate = useNavigate();
  const userBans: Array<any> = useSelector(selectUserDomains());

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForConfirmation") {
      //if user has not any domains we redirets user to my-page empty
      navigate("my-page"), closeModal();
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      !userBans.length ? store.dispatch(reloadAllUserInfo.request()) : setFoundDomain(null);
    }

  }, [transactionState, setCurrentView]);

  return (
    <Modal isShown={isShown} header="Attention1">
      <>
        <Box>
          <Paragraph sx={{ fontFamily: 'SFProDisplay', textAlign: 'center' }}>You are going to buy a BANS with the set expiration period - <Text sx={{ fontWeight: 700 }}>{foundDomain.expiresAt}.</Text> </Paragraph>
          <Paragraph sx={{ fontFamily: 'SFProDisplay', textAlign: 'center' }}>You will need to renew your subscription before the expiring date.</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={closeModal} text="cancel" />
          <RegisterAction
            transactionId={TRANSACTION_ID}
            change={"buyDomain"}
            domain={foundDomain}
            disabled={isTransactionPending}
          >
            <ArrowRight />
            continue
          </RegisterAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}