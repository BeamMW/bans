import React, { FC } from 'react';
import Button from '../../components/Button';
import CopyBlue from "../../assets/icons/copy-blue.svg";
import Copy from "../../assets/icons/copy.svg";
import { Modal } from '../../components/Modals/Modal';  
import { Container, Title, Content, Controls, CopyText } from './KeyModal.style';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';

interface KeyModalProps {
  isShown: boolean;
  toggle: () => void;
  copyToClipboard: (pKey: string) => void;
}
const KeyModal:FC<KeyModalProps> = ({isShown, toggle, copyToClipboard}) => {
  // const pKey = useSelector(selectPublicKey());
  const pKey = 'test key';

  const handleConfirm: React.MouseEventHandler = async () => {
    await copyToClipboard(pKey);
    toggle();
  };

  const handleCopy = async () => {
    await copyToClipboard(pKey);
  }
return (
  <>
    <Modal isShown={isShown}>
      <Container>
        <Title>Public Key</Title>
        <Content>
          <span>bb0d9b3aaced20ffe24403519c9830324d2de0fb6742e5af09a8a04f9aad4bf240</span>
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
