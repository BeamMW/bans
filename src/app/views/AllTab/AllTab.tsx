import React from "react";
import { Flex, Container } from "theme-ui";
import Button from "@app/components/Button";
import { Popup } from "@app/components/Popup/Popup";
import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { copyToClipboard } from '@app/core/appUtils';
import { RenewModal } from '@app/views/Modals/RenewModal';
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { SellBansModal } from '@app/views/Modals/SellBans';
import { Transfer } from "@app/views/Modals/Transfer";
import { RemoveOrChange, ModalManager as RightSideModalManager } from '@app/views/RemoveOrChange/RemoveOrChange';

import Dots from '@app/assets/icons/dots.svg';
import Renew from '@app/assets/icons/renew.svg';
import Sell from '@app/assets/icons/sell.svg';
import TransferIcon from '@app/assets/icons/gift.svg';
import { PopupItem } from '@app/components/Popup/Popup.styles';

interface RightSideProps {
  domain: DomainPresenterType;
  domainsToSell: any;
}
const RightSide: React.FC<RightSideProps> = ({ domain, domainsToSell }) => {
  const [showPopup, setShowPopup] = React.useState(null);
  const {open} = useModalContext();

  const hideTip = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Container sx={{ position: 'relative' }}
        onMouseLeave={hideTip}
      >
        <Flex sx={{justifyContent: 'flex-end'}}>
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={(event) => open(event)("modal-renew")({domain: domain, })(hideTip)}>
            <Renew />
            renew subscription
          </PopupItem>
          <PopupItem onClick={(event) => open(event)("modal-sell")({domain: domain, domainsToSell: domainsToSell})(hideTip) }>
            <Sell />
            sell BANS
          </PopupItem>
          <PopupItem onClick={(event) => open(event)("modal-transfer")({domain: domain})(hideTip) }>
            <TransferIcon />
            Transfer
          </PopupItem>
        </Popup>
      </Container>
    </>
  )
}

export const AllTab: React.FC<{ domains: Array<DomainPresenterType> }> = (props) => {
  const { domains } = props;
  
  const domainsToSell: any = !!domains && domains.length ? domains.filter((domain, i) => !domain.isOnSale) : [];

  //This name is in grace period, and needs to be renewed by June 30, 2022
  const rows =
    domains.map((domain, i) => (
      <SplitContainer key={i} leftWeight={9} rightWeight={3}>
        <LeftSide domain={domain} showBelonging={false} showSaleIcon={true} />
        {
          domain.isOnSale ?
            <RemoveOrChange copyToClipboard={copyToClipboard} domains={domains} domain={domain} /> :
            <RightSide domain={domain} domainsToSell={domainsToSell} />
        }
      </SplitContainer>
    ));

  return (
    <>
      {rows}
      <ModalManager/>
      <RightSideModalManager/>
    </>
  );
}

const ModalManager: React.FC = () => {
  const {current, close} = useModalContext();

  return (
    <>
      <RenewModal isShown={current == "modal-renew"} />
      <SellBansModal isShown={current == "modal-sell"} />
      <Transfer isShown={current == "modal-transfer"} />
    </>
  );
};