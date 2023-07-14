import React, { useState } from 'react';
import {
  IconFaq, IconKey, IconSend, IconUser, IconWallet,
} from '@app/shared/icons';
import { styled } from '@linaria/react';
import { Button, PKeyModal, SendModal } from '@app/shared/components/index';
import { useModal } from '@app/shared/hooks';
import Utils from '@core/utils.js';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';

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
  const navigate = useNavigate();
  const { isShowing, onOpen, onClose } = useModal(false);
  const [current, setCurrent] = useState('');
  const navigateToDomainPage = () => {
    navigate(ROUTES.MAIN.DOMAIN_PAGE);
  };
  const navigateToTransactionPage = () => {
    navigate(ROUTES.MAIN.TRANSACTION_PAGE);
  };
  const navigateToFaqPage = () => {
    navigate(ROUTES.MAIN.FAQ_PAGE);
  };

  return (
    <>
      <Container>
        <Button icon={IconFaq} variant="icon" width="32px" height="32px" onClick={navigateToFaqPage} />
        <Button icon={IconKey} variant="icon" width="32px" height="32px" onClick={() => setCurrent('pkey')} />
        <Button icon={IconSend} variant="icon" width="32px" height="32px" onClick={onOpen} />
        <Button icon={IconWallet} variant="icon" width="32px" height="32px" onClick={navigateToTransactionPage} />
        <Button icon={IconUser} variant="icon" width="32px" height="32px" onClick={navigateToDomainPage} />
      </Container>
      <SendModal isShown={isShowing} onClose={onClose} />
      <PKeyModal isShown={current === 'pkey'} onClose={() => setCurrent('')} />
    </>
  );
}

export default Menu;
