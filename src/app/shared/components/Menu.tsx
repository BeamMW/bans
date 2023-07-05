import React from 'react';
import {
  IconFaq, IconKey, IconSend, IconUser, IconWallet,
} from '@app/shared/icons';
import { styled } from '@linaria/react';
import { Button } from '@app/shared/components/index';

const Container = styled.div`
    display: flex;
    max-width: 10.2rem  /* 120/100 */;
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
  return (
    <Container>
      <Button variant="icon" pallete="opacity"><IconFaq style={active ? activeStyle : passiveStyle} /></Button>
      <IconKey />
      <IconSend />
      <IconWallet />
      <IconUser />
    </Container>
  );
}

export default Menu;
