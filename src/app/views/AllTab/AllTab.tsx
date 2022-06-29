import React from "react";
import { Flex, Text, Container } from "theme-ui";
import Button from "../../components/Button";
import { Popup } from "../../components/Popup/Popup";
import { SplitContainer } from "../../components/SplitContainer/SplitContainer";
import Copy from '././../../assets/icons/copy.svg';
import Dots from '././../../assets/icons/dots.svg';
import Renew from '././../../assets/icons/renew.svg';
import Sell from '././../../assets/icons/sell.svg';
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { copyToClipboard } from '../../core/appUtils';
import { useModal } from "@app/components/Modals/useModal";
import { RenewModal } from './../RenewModal/RenewModal';
import { PopupItem } from '@app/components/Popup/Popup.styles';
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { SellBansModal } from './../SellBans/SellBans';
interface RightSideProps {
  copyToClipboard: (value: string) => void;
  domain: DomainPresenterType;
  domains: any;
}
const RightSide: React.FC<RightSideProps> = ({ copyToClipboard, domain, domains }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [showSellModal, setShowSellModal] = React.useState(false);
  const { isShown, toggle } = useModal();

  const toggleShowSellModal = () => {
    setShowSellModal(!showSellModal)
  }

  const hideTip = () => {
      setShowPopup(false);
  };

  return (
    <>
      <Container sx={{ position: 'relative' }}
        onMouseLeave={hideTip}
      >
        <Flex>
          <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button>
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={() => { toggle(); hideTip() }}>
            <Renew />
            renew subscription
          </PopupItem>
          <PopupItem onClick={() => {toggleShowSellModal(); hideTip()}}>
            <Sell />
            sell BANS
          </PopupItem>
        </Popup>
      </Container>
      {domains && <RenewModal selectedDomain={domain} isModalShown={isShown} closeModal={toggle} />}
      {domains && <SellBansModal domain={domain} domains={domains} toggle={toggleShowSellModal} isShown={showSellModal} />}
    </>
  )
}
export const AllTab: React.FC<{ domains: any }> = (props) => {
  const { domains } = props;
  //This name is in grace period, and needs to be renewed by June 30, 2022

  const rows = 
  domains.map((domain, i) => (
      <SplitContainer key={i} leftWeight={12} rightWeight={0}>
        <LeftSide domain={domain} />
        <RightSide copyToClipboard={copyToClipboard} domains={domains} domain={domain}/>
      </SplitContainer>
  ));

  return (
    <>
      {rows}
    </>
  );
}