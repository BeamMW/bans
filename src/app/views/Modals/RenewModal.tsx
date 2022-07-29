import React, { useEffect, useState } from "react";
import { Divider, Text} from "theme-ui";
import store from "index";
import { Modal } from "@app/components/Modals/Modal";
import { RegistrationHeader } from "@app/components/RegistrationHeader/RegistrationHeader";
import { RegistrationPrice } from "@app/components/RegistrationPrice/RegistrationPrice";
import { RegistrationPeriod } from '@app/components/RegistrationPeriod/RegistrationPeriod';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { RegisterAction } from "@app/views/Actions/RegisterAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { useModalContext } from "@app/contexts/Modal/ModalContext";

import Renew from '@app/assets/icons/renew-blue.svg';
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import useCalculateDomainPrice from "@app/hooks/useCalculateDomainPrice";
interface RenewModalProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

export const RenewModal: React.FC<RenewModalProps> = ({ isShown, closeModal }) => {

  if (!isShown) return <></>;

  const { close, data: { domain: domain } }: { close: any, data: { domain: DomainPresenterType } } = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "DOMAIN_EXTENDED";
  const [period, setPeriod] = useState<number>(1/* selectedDomain.alreadyexistingperiod */);

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const price = useCalculateDomainPrice(domain.name);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForApproval") {
      closeModal(null);
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      store.dispatch(reloadAllUserInfo.request());

      return () => {
        store.dispatch(reloadAllUserInfo.request());
      }
    }
  }, [transactionState]);


  return (
    <Modal isShown={isShown} header="Renew subscription">
      <>
        <RegistrationHeader search={domain.name} />
        <Divider sx={{ my: 3 }} />
        <RegistrationPeriod period={period} setPeriod={setPeriod} />
        <RegistrationPrice price={{ ...domain.price, ...{ amount: price } }} period={period} />
        <ButtonContainer>
          <CloseBtn toggle={closeModal} />
          <RegisterAction
            transactionId={TRANSACTION_ID}
            change={"renewDomainExpiration"}
            period={period}
            domain={domain}
            disabled={isTransactionPending}
          >
            <Renew />
            <Text sx={{ fontWeight: 'bold', color: '#032E49', marginLeft: '9px' }}>renew</Text>
          </RegisterAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}