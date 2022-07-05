import React from 'react';
import { Flex, Container } from "theme-ui";
import Button from "@app/components/Button";
import { Popup } from "@app/components/Popup/Popup";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { RemoveModal } from '@app/views/RemoveModal/RemoveModal';
import { Amount } from '@app/components/Amount/Amount';
import { ChangePrice } from '@app/views/ChangePrice/ChangePrice';
import { GROTHS_IN_BEAM } from '@app/constants';
import { Decimal } from '@app/library/base/Decimal';

import Dots from '././../../assets/icons/dots.svg';
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
  const [showSetPrice, setShowSetPrice] = React.useState(false);
  const [showRemove, setShowRemove] = React.useState(false);

  const toggleshowSetPriceModal = () => {
    setShowSetPrice(!showSetPrice)
  }

  const toggleShowRemoveModal = () => {
    setShowRemove(!showRemove);
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
        <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString(2)} size="14px"  showConvertedToUsd={true}/>
          {/* <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button> */}
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={() => { toggleshowSetPriceModal(); hideTip() }}>
            <ChangePriceIcon />
            change price
          </PopupItem>
          <PopupItem onClick={() => {toggleShowRemoveModal(); hideTip()}}>
            <RemoveFromSale/>
            remove from Sale
          </PopupItem>
        </Popup>
      </Container>

      <RemoveModal domain={domain} isShown={showRemove} toggleClose={toggleShowRemoveModal}/>
      <ChangePrice domain={domain} isShown={showSetPrice} toggleClose={toggleshowSetPriceModal} />
    </>
  )
}
