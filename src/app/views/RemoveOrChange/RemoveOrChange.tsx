import React from 'react';
import { Flex, Container } from "theme-ui";
import Button from "@app/components/Button";
import { Popup } from "@app/components/Popup/Popup";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { RemoveModal } from '@app/views/Modals/RemoveModal';
import { Amount } from '@app/components/Amount/Amount';
import { ChangePrice } from '@app/views/Modals/ChangePrice';
import { GROTHS_IN_BEAM } from '@app/constants';
import { Decimal } from '@app/library/base/Decimal';
import { useModalContext } from '@app/contexts/Modal/ModalContext';

import Dots from '@app/assets/icons/dots.svg';
import ChangePriceIcon from '@app/assets/icons/edit.svg';
import RemoveFromSale from '@app/assets/icons/remove-sale.svg';

import { PopupItem } from '@app/components/Popup/Popup.styles';
interface RemoveOrChangeProps {
  copyToClipboard: (value: string) => void;
  domain: DomainPresenterType;
  domains: any;
}
// TODO: Remove dublicate code, create component for reusing copy and dots

export const RemoveOrChange: React.FC<RemoveOrChangeProps> = ({ copyToClipboard, domain, domains }) => {
  const [showPopup, setShowPopup] = React.useState(false);
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
        <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString(2)} size="14px"  showConvertedToUsd={true}/>
          {/* <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button> */}
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={(event) => open(event)("modal-adjust-sale")({domain: domain})(hideTip)}>
            <ChangePriceIcon />
            change price
          </PopupItem>
          <PopupItem onClick={(event) => open(event)("modal-remove-from-sale")({domain: domain})(hideTip)}>
            <RemoveFromSale/>
            remove from Sale
          </PopupItem>
        </Popup>
      </Container>
    </>
  )
}


export const ModalManager: React.FC = () => {
  const {current, close} = useModalContext();

  return (
    <>
      <RemoveModal isShown={current == "modal-remove-from-sale"} />
      <ChangePrice isShown={current == "modal-adjust-sale"} />
    </>
  );
};