import React from 'react';
import { Flex, Container } from "theme-ui";
import Button from "../../components/Button";
import { Popup } from "../../components/Popup/Popup";
import Copy from '././../../assets/icons/copy.svg';
import Dots from '././../../assets/icons/dots.svg';
import ChangePriceIcon from '././../../assets/icons/edit.svg';
import RemoveFromSale from '././../../assets/icons/remove-sale.svg';
import { PopupItem } from '@app/components/Popup/Popup.styles';
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { RemoveModal } from '../RemoveModal/RemoveModal';
import { Amount } from '@app/components/Amount/Amount';
import { ChangePrice } from './../ChangePrice/ChangePrice';
// I think we will find more appropriate name for this Component
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
        <Flex>
        <Amount value="200" size="14px"  showConvertedToUsd={true}/>
          <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button>
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

      <RemoveModal isShown={showRemove} toggleClose={toggleShowRemoveModal}/>
      <ChangePrice isShown={showSetPrice} toggleClose={toggleshowSetPriceModal} />
    </>
  )
}
