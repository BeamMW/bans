import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';  
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { selectPublicKey } from '@app/store/SharedStore/selectors';

import CopyBlue from "@app/assets/icons/copy-blue.svg";
import Copy from "@app/assets/icons/copy.svg";
import { Container, Title, Content, Controls, CopyText } from './KeyModal.style';

interface KeyModalProps {
  isShown: boolean;
  toggle: () => void;
  copyToClipboard: (pKey: string) => void;
}
const KeyModal:FC<KeyModalProps> = ({isShown, toggle, copyToClipboard}) => {
  const publicKey = useSelector(selectPublicKey())

  const handleConfirm: React.MouseEventHandler = async () => {
    await copyToClipboard(publicKey);
    toggle();
  };

  const handleCopy = async () => {
    await copyToClipboard(publicKey);
  }
return (
  <>
    <Modal isShown={isShown}>
      <Container>
        <Title>Public Key</Title>
        <Content>
          <span>{publicKey}</span>
          <Button variant='icon' pallete='transparent' onClick={handleCopy}>
            <Copy />
          </Button>
        </Content>
        <Controls>
          <CloseBtn toggle={toggle} />
          <Button
           variant='custom'
           onClick={handleConfirm}
           padding="11px 25px 11px 22px"
           height='38px'
           width='fit-content'
           borderRadius='50px'
           >
            <CopyBlue />
            <CopyText>copy and close</CopyText>
          </Button>
        </Controls>
      </Container>
    </Modal>
  </>
  );
};

export default KeyModal;
