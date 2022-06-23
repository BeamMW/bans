import { Modal } from "@app/components/Modals/Modal";
import { RegistrationHeader } from "@app/components/RegistrationHeader/RegistrationHeader";
import { RegistrationPrice } from "@app/components/RegistrationPrice/RegistrationPrice";
import React from "react";
import { Divider } from "theme-ui";
import { RegistrationPeriod } from './../../components/RegistrationPeriod/RegistrationPeriod';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import Button from "@app/components/Button";
import Renew from '../../assets/icons/renew-blue.svg';
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";

interface RenewModalProps {
  isModalShown: boolean;
  closeModal: () => void;
}

export const RenewModal: React.FC<RenewModalProps> = ({ isModalShown, closeModal }) => {
  return (
    <Modal isShown={isModalShown} header="Renew subscription">
      <>
      <RegistrationHeader search="masterSplinter" />
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