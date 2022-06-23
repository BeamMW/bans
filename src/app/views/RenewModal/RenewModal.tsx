import { Modal } from "@app/components/Modals/Modal";
import { RegistrationHeader } from "@app/components/RegistrationHeader/RegistrationHeader";
import { RegistrationPrice } from "@app/components/RegistrationPrice/RegistrationPrice";
import React, { useCallback, useState } from "react";
import { Divider } from "theme-ui";
import { RegistrationPeriod } from './../../components/RegistrationPeriod/RegistrationPeriod';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import Button from "@app/components/Button";
import Renew from '../../assets/icons/renew-blue.svg';
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

interface RenewModalProps {
  isModalShown: boolean;
  closeModal: () => void;
  selectedDomain: DomainPresenterType
}

export const RenewModal: React.FC<RenewModalProps> = ({ isModalShown, closeModal, selectedDomain }) => {

  const [period, setPeriod] = useState<number>(1);

  const periodIncrease = useCallback(() => period < 5 && setPeriod(period + 1), []);
  const periodDecrease = useCallback(() => period > 1 && setPeriod(period - 1), [])

  return (
    <Modal isShown={isModalShown} header="Renew subscription">
      <>
      <RegistrationHeader search={selectedDomain.name} />
      <Divider sx={{ my: 5 }} />
      <RegistrationPeriod period={4} setPeriod={() => {}} periodDecrease={() => {}} />
      <RegistrationPrice />
      <ButtonContainer>
          <CloseBtn toggle={closeModal}/>
          <Button pallete="green">
            <Renew/>
            renew
          </Button>
      </ButtonContainer>
      </>
    </Modal> 
  )
}