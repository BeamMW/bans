import React, { FC } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Button from '@app/components/Button';
import {Tooltip, DIRECTIONS } from '@app/components/Tooltip/Tooltip';
import { useModal } from '@app/components/Modals/useModal';
import KeyModal from '@app/views/keyModal/KeyModal';
import { copyToClipboard } from '../../core/appUtils';
import FaqIcon from "@app/assets/icons/faq.svg";
import KeyIcon from "@app/assets/icons/key.svg";
import UserIcon from "@app/assets/icons/user.svg";
import SendGreenIcon from '@app/assets/icons/send-green.svg';

import { TabsContainer, TabsChildren } from './Tabs.style';
import { SendBans } from '@app/views/SendBans/SendBans';

let activeButtonStyle = {
  background: '#00F6D2',
};

let passiveButtonStyle = {
  background: 'rgba(255,255,255,0.1)',
}

const activeIconStyle = {
  filter: 'brightness(0)',
}

const passiveIconStyle = {
  background: 'none',
}

const Tabs:FC = () => {
  const { isShown, toggle } = useModal();
  const [isSendFundsShown, setSendFundsShown] = React.useState(false);
  const [active, setActive] = React.useState('');
  let location = useLocation();

  const onCloseSendFunds = () =>  setSendFundsShown(false);

  const onToggleSendFunds = () =>{
    setSendFundsShown(!isSendFundsShown);
  }
  
  const handleClick = (tab: string) => {
      setActive(tab);
  }

  React.useEffect(() => {
    setActive(location.pathname.split('/')[1])
  }, [location]);


  return (
    <>
  <TabsContainer>
    <TabsChildren>
        <Tooltip content='send funds' direction={DIRECTIONS.BOTTOM}>
          <Button
          variant='icon'
          pallete='opacity'
          id='sendFunds'
          onClick={onToggleSendFunds}
          style={ isSendFundsShown ? activeButtonStyle : passiveButtonStyle }
          >
            <SendGreenIcon 
              style={ isSendFundsShown ? activeIconStyle : passiveIconStyle }
            />
          </Button>
        </Tooltip>
      <NavLink
       to="/faq">
        <Tooltip content='FAQ' direction={DIRECTIONS.BOTTOM}>
          <Button
            variant='icon'
            pallete='opacity'
            id='faq'
            onClick={e => handleClick('faq')}
            style={ active === 'faq' ? activeButtonStyle : passiveButtonStyle }
          >
            <FaqIcon 
              style={ active === 'faq' ? activeIconStyle : passiveIconStyle }
            />
          </Button>
        </Tooltip>
      </NavLink>
      <Tooltip content='Public Key' direction={DIRECTIONS.BOTTOM}>
        <Button
          variant='icon'
          pallete='opacity'
          id='key'
          onClick={toggle}
          style={ isShown ? activeButtonStyle : passiveButtonStyle }
        >
          <KeyIcon 
            style={ isShown ? activeIconStyle : passiveIconStyle }
          />
        </Button>
      </Tooltip>
      <NavLink to='my-page'>
        <Tooltip content='My page' direction={DIRECTIONS.BOTTOM} customClass="page">
          <Button
            variant='icon'
            pallete='opacity'
            id='page'
            onClick={e => handleClick('my-page')}
            style={ active === 'my-page' ? activeButtonStyle : passiveButtonStyle }
          >
            <UserIcon 
              style={ active === 'my-page' ? activeIconStyle : passiveIconStyle }
            />
          </Button>
        </Tooltip>
      </NavLink>
    </TabsChildren>
  </TabsContainer>
  <KeyModal isShown={isShown} toggle={toggle} copyToClipboard={copyToClipboard}/>
  <SendBans isShown={isSendFundsShown} toggleModalClose={onCloseSendFunds} />
  </>
  )
}


export default Tabs;