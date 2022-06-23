import React, { FC } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Button from '../../components/Button';
import {Tooltip, DIRECTIONS } from '../../components/Tooltip/Tooltip';
import { useModal } from '../../components/Modals/useModal';
import KeyModal from '../keyModal/KeyModal';
import { copyToClipboard } from '../../core/appUtils';
import FaqIcon from "../../assets/icons/faq.svg";
import KeyIcon from "../../assets/icons/key.svg";
import UserIcon from "../../assets/icons/user.svg";
import InfoKey from "../../assets/icons/info.svg";
import { TabsContainer, TabsChildren } from './Tabs.style';

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
  const [active, setActive] = React.useState('');
  let location = useLocation();

  React.useEffect(() => {
    setActive(location.pathname.split('/')[1])
  }, [location]);

  const handleClick = (tab: string) => {
      setActive(tab);
  }

  return (
    <>
  <TabsContainer>
    <TabsChildren>
      <NavLink
        to="/about"
      >
        <Tooltip content='About' direction={DIRECTIONS.BOTTOM}>
          <Button
          variant='icon'
          pallete='opacity'
          id='about'
          onClick={e => handleClick('about')}
          style={ active === 'about' ? activeButtonStyle : passiveButtonStyle }
          >
            <InfoKey
              style={ active === 'about' ? activeIconStyle : passiveIconStyle }
            />
          </Button>
        </Tooltip>
      </NavLink>
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
  </>
  )
}


export default Tabs;