import React from 'react';
import {
  IconFaq, IconKey, IconSend, IconUser, IconWallet,
} from '@app/shared/icons';
import { styled } from '@linaria/react';
import { Button, Modal, SendModal } from '@app/shared/components/index';
import { useModal } from '@app/shared/hooks';

const Container = styled.div`
    display: flex;
    max-width: 14.2rem  /* 120/100 */;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    right: 0;
`;
const passiveStyle = {
  background: 'rgba(255,255,255,0.1)',
};
const activeStyle = {
  background: '#00F6D2',
};
const active = false;
function Menu() {
  const { isShowing, onOpen, onClose } = useModal(false);

  return (
    <>
      <Container>
        <Button variant="icon" width="32px" height="32px"><IconFaq style={active ? activeStyle : passiveStyle} /></Button>
        <Button variant="icon" width="32px" height="32px"><IconKey /></Button>
        <Button variant="icon" width="32px" height="32px" onClick={onOpen}><IconSend /></Button>
        <Button variant="icon" width="32px" height="32px"><IconWallet /></Button>
        <Button variant="icon" width="32px" height="32px"><IconUser /></Button>
      </Container>
      <SendModal isShown={isShowing} onClose={onClose} />
    </>
  );
}

export default Menu;
