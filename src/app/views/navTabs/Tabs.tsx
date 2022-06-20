import React, { FC } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Button from '../../components/Button';
//import {Tooltip} from '../../components/Tooltip';
import { useModal } from '../../components/Modals/useModal';
import KeyModal from '../keyModal/KeyModal';
import { copyToClipboard } from '../../core/appUtils';
import { ReactComponent as FaqIcon } from "../../assets/icons/faq.svg";
import { ReactComponent as KeyIcon } from "../../assets/icons/key.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as InfoKey } from "../../assets/icons/info.svg";
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
      <Button
       variant='icon'
       pallete='opacity'
       id='about'
       onClick={e => handleClick('about')}
       style={ active === 'about' ? activeButtonStyle : passiveButtonStyle }
       >
        {/* <Tooltip message={'About'} placement={"top"}>
          <InfoKey
            style={ active === 'about' ? activeIconStyle : passiveIconStyle }
       />
        </Tooltip> */}
      </Button>
      </NavLink>
      <NavLink
       to="/faq">
        <Button
          variant='icon'
          pallete='opacity'
          id='faq'
          onClick={e => handleClick('faq')}
          style={ active === 'faq' ? activeButtonStyle : passiveButtonStyle }
        >
          {/* <Tooltip message={'FAQ'} placement={"top"}>
            <FaqIcon 
             style={ active === 'faq' ? activeIconStyle : passiveIconStyle }
            />
          </Tooltip> */}
        </Button>
      </NavLink>
      <Button
        variant='icon'
        pallete='opacity'
        id='key'
        onClick={e =>  { handleClick('key'); toggle() } }
        style={ active === 'key' ? activeButtonStyle : passiveButtonStyle }
      >
        {/* <Tooltip message={'Public Key'} placement={"top"}>
          <KeyIcon 
           style={ active === 'key' ? activeIconStyle : passiveIconStyle }
          />
        </Tooltip> */}
      </Button>
      <NavLink to='my-page'>
        <Button
          variant='icon'
          pallete='opacity'
          id='page'
          onClick={e => handleClick('my-page')}
          style={ active === 'my-page' ? activeButtonStyle : passiveButtonStyle }
        >
          {/* <Tooltip message={'My page'} placement={"top"}>
            <UserIcon 
              style={ active === 'my-page' ? activeIconStyle : passiveIconStyle }
            />
          </Tooltip> */}
        </Button>
      </NavLink>
    </TabsChildren>
  </TabsContainer>
  <KeyModal isShown={isShown} toggle={toggle} copyToClipboard={copyToClipboard}/>
  </>
  )
}


export default Tabs;