import React from "react";
import Input from "@app/components/Input";
import { Modal } from "@app/components/Modals/Modal";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import Button from "@app/components/Button";
import SendIcon from '@app/assets/icons/send.svg';
import BeamIcon from '@app/assets/icons/beam.svg';
import CheckedIcon from '@app/assets/icons/checked.svg';

interface SendBansProps {
  isShown: boolean;
  toggleModalClose: () => void;
}

const initialValues = {
  domain: '',
  amount:  0
}

export const SendBans:React.FC<SendBansProps> = ({ isShown, toggleModalClose }) => {
  const [values, setValues] = React.useState(initialValues);

  const toggleClose = () => {
    toggleModalClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setValues({
      ...values,
      [name]: value,
    });
  }
 
 return (
    <Modal isShown={isShown} header="Send funds to the BANS">
      <>
        <Input
          variant='modalInput'
          pallete='purple'
          label='Domain*'
          name='domain'
          onChange={handleChange}
          value={values.domain}
        >
          <CheckedIcon />
        </Input>
        <Input
          variant='modalInput'
          pallete='purple'
          label='Amount*'
          name='amount'
          onChange={handleChange}
          value={values.amount}
          info={'98.99 USD'}
        >
          <BeamIcon />
        </Input>

        <ButtonContainer>
          <CloseBtn toggle={toggleClose} text="cancel" />
          <Button pallete="green" onClick={() => {}}>
          <SendIcon/>
          Send
          </Button>
        </ButtonContainer>
      </>
    </Modal>
  )
}