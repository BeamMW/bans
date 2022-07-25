import React, { useEffect } from 'react';
import { Box, Paragraph, Text } from 'theme-ui';

import { IsTransactionPending } from '@app/library/transaction-react/IsTransactionStatus';
import { useCurrentTransactionState } from '@app/library/transaction-react/useCurrentTransactionState';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { Modal } from '@app/components/Modals/Modal';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { RegisterAction } from '@app/views/Actions/RegisterAction';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import ArrowRight from '@app/assets/icons/arrow-right.svg'
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import store from 'index';
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import { useSelector } from 'react-redux';
import { selectUserDomains } from '@app/store/BansStore/selectors';
import { useNavigate } from 'react-router-dom';

interface ResultForSaleProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}
export const BuyBans: React.FC<ResultForSaleProps> = ({ isShown, closeModal }) => {

  if(!isShown) return <></>;

  const { close, data: {domain: domain} }: {close: any, data: {domain: DomainPresenterType}} = useModalContext();

  closeModal = closeModal ?? close;

  if(!domain) return <></>;

  const navigate = useNavigate();

  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const userBans: Array<any> = useSelector(selectUserDomains());

  useEffect(() => {
    if(!userBans.length) {
      if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForConfirmation") {
        //if user has not any domains we redirets user to my-page empty
        navigate("my-page"), closeModal(null);
      }
    } else {
      if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForApproval") {
        closeModal(null);
      }
    }
    
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      store.dispatch(reloadAllUserInfo.request());

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);

  return (
    <Modal isShown={isShown} header="Attention">
      <>
        <Box>
          <Paragraph sx={{ fontFamily: 'SFProDisplay', textAlign: 'center',color:'#fff' }}>You are going to buy a BANS with the set expiration period - <Text sx={{fontWeight: 700}}>{domain.expiresAt}.</Text> </Paragraph>
          <Paragraph sx={{ fontFamily: 'SFProDisplay', textAlign: 'center', color:'#fff' }}>You will need to renew your subscription before the expiring date.</Paragraph>
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