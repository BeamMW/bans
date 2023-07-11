import React, { useState } from 'react';
import {
  IconFaq, IconKey, IconSend, IconUser, IconWallet,
} from '@app/shared/icons';
import { styled } from '@linaria/react';
import { Button, PKeyModal, SendModal } from '@app/shared/components/index';
import { useModal } from '@app/shared/hooks';
import Utils from '@core/utils.js';

const Container = styled.div`
  margin-top: ${() => (Utils.isWeb() ? '20px' : '0')};
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
  const [current, setCurrent] = useState('');

  return (
    <>
      <Container>
        <Button variant="icon" width="32px" height="32px"><IconFaq style={active ? activeStyle : passiveStyle} /></Button>
        <Button variant="icon" width="32px" height="32px" onClick={() => setCurrent('pkey')}><IconKey /></Button>
        <Button variant="icon" width="32px" height="32px" onClick={onOpen}><IconSend /></Button>
        <Button variant="icon" width="32px" height="32px"><IconWallet /></Button>
        <Button variant="icon" width="32px" height="32px"><IconUser /></Button>
      </Container>
      <SendModal isShown={isShowing} onClose={onClose} />
      <PKeyModal isShown={current === 'pkey'} onClose={() => setCurrent('')} />
    </>
  );
}

export default Menu;
