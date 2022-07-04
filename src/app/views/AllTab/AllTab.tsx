import React from "react";
import { Flex, Text, Container } from "theme-ui";
import Button from "@app/components/Button";
import { Popup } from "@app/components/Popup/Popup";
import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { copyToClipboard } from '../../core/appUtils';
import { useModal } from "@app/components/Modals/useModal";
import { RenewModal } from '@app/views/RenewModal/RenewModal';
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { SellBansModal } from '@app/views/SellBans/SellBans';
import { Transfer } from "@app/views/Transfer/Transfer";
import { RemoveOrChange } from '@app/views/RemoveOrChange/RemoveOrChange';

import Copy from '@app/assets/icons/copy.svg';
import Dots from '@app/assets/icons/dots.svg';
import Renew from '@app/assets/icons/renew.svg';
import Sell from '@app/assets/icons/sell.svg';
import TransferIcon from '@app/assets/icons/gift.svg';
import { PopupItem } from '@app/components/Popup/Popup.styles';

interface RightSideProps {
  copyToClipboard: (value: string) => void;
  domain: DomainPresenterType;
  domains: any;
}
const RightSide: React.FC<RightSideProps> = ({ copyToClipboard, domain, domains }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [showSellModal, setShowSellModal] = React.useState(false);
  const [showTransfer, setShowTransfer] = React.useState(false);

  const { isShown, toggle } = useModal();

  const toggleShowSellModal = () => {
    setShowSellModal(!showSellModal)
  }

  const toggleShowTranferModal = () => {
    setShowTransfer(!showTransfer);
  }

  const hideTip = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Container sx={{ position: 'relative' }}
        onMouseLeave={hideTip}
      >
        <Flex sx={{justifyContent: 'flex-end'}}>
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
          <PopupItem onClick={() => { toggleShowSellModal(); hideTip() }}>
            <Sell />
            sell BANS
          </PopupItem>
          <PopupItem onClick={toggleShowTranferModal}>
            <TransferIcon />
            Transfer
          </PopupItem>
        </Popup>
      </Container>
      {domains && <RenewModal selectedDomain={domain} isModalShown={isShown} closeModal={toggle} />}
      {domains && <SellBansModal domain={domain} domains={domains} toggle={toggleShowSellModal} isShown={showSellModal} />}
      {domains && <Transfer domain={domain} isShown={showTransfer} toggleClose={toggleShowTranferModal} />}
    </>
  )
}
export const AllTab: React.FC<{ domains: Array<DomainPresenterType> }> = (props) => {
  const { domains } = props;
  //This name is in grace period, and needs to be renewed by June 30, 2022
  const rows =
    domains.map((domain, i) => (
      <SplitContainer key={i} leftWeight={10} rightWeight={2}>
        <LeftSide domain={domain} />
        {
          domain.isOnSale ?
            <RemoveOrChange copyToClipboard={copyToClipboard} domains={domains} domain={domain} /> :
            <RightSide copyToClipboard={copyToClipboard} domains={domains} domain={domain} />
        }
      </SplitContainer>
    ));

  return (
    <>
      {rows}
    </>
  );
}