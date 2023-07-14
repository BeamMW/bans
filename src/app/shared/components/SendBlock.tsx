import React from 'react';
import { styled } from '@linaria/react';
import { IconBeam, IconChecked, IconSendBlack } from '@app/shared/icons';
import {
  Button, Input, Modal, SendModal,
} from '@app/shared/components/index';
import { useModal } from '@app/shared/hooks';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.875rem;
  transition: margin-right 2s cubic-bezier(0, 0, 1, 1) 50ms;
`;
const ButtonWrapper = styled.div`
width: 100%;
  margin-top: 1.875rem;
`;
const Text = styled.span`
  color: #FFF;
  font-family: 'SFProDisplay', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.699999988079071;
`;

function SendBlock() {
  const { isShowing, onOpen, onClose } = useModal(false);

  return (
    <Container>
      <Text>or</Text>
      <ButtonWrapper>
        <Button icon={IconSendBlack} onClick={() => onOpen()}>
          send funds to the domain
        </Button>
      </ButtonWrapper>
      <SendModal isShown={isShowing} onClose={onClose} />
    </Container>
  );
}

export default SendBlock;
