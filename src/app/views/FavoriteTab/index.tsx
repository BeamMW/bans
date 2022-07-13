import React, { useEffect, useState } from "react";
import { Flex, Text, Container } from "theme-ui";
import { useSelector } from "react-redux";

import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { selectFavoritesDomains, selectIsFavoriteLoaded } from "@app/store/BansStore/selectors";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { Amount } from "@app/components/Amount/Amount";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import { SearchResultForSale } from "../Search/components/SearchResult/SearchResultForSale";
import { useModal } from "@app/components/Modals/useModal";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { BuyBans } from "../Modals/BuyBans";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { Register } from "../Register/Register";
import Button from "@app/components/Button";
import SendGreenIcon from '@app/assets/icons/send-green.svg';
import Dots from '@app/assets/icons/dots.svg';
import { Popup } from "@app/components/Popup/Popup";
import { PopupItem } from "@app/components/Popup/Popup.styles";
import Heart from '@app/assets/icons/heart.svg';
import { useHandleHeartAction } from "@app/hooks/useHandleHeartAction";
import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";

interface RightSideProps {
  domain: DomainPresenterType;
}
const RightSide: React.FC<RightSideProps> = ({ domain }) => {
  const { open } = useModalContext();
  const [showPopup, setShowPopup] = React.useState(null);
  const isBansLove = useIsBansFavorite(domain.name);
  const heartHandler = useHandleHeartAction(isBansLove, domain.name);

  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex sx={{ justifyContent: 'flex-end', alignItems: "baseline" }}>
          {
            !domain.isYourOwn && !domain.isOnSale && !domain.isAvailable &&
            <Button variant="ghostBordered" pallete="green" style={{ margin: '0 20px 0 20px' }} onClick={
              (event) => open(event)("modal-send-funds")({ domain: domain })(null)
            }>
              <SendGreenIcon />
              send funds
            </Button>
          }
          {
            !domain.isYourOwn && domain.isOnSale && <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString()} size="14px" />
          }
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={heartHandler}>
            <Heart />
            remove from favorites
          </PopupItem>
        </Popup>
      </Container>
    </>
  )
}

export const FavoriteTab = ({ domains: favoriteDomains }) => {
  const isFavoriteLoaded = useSelector(selectIsFavoriteLoaded());

  const { open } = useModalContext();
  const { setFoundDomain, setCurrentView, view } = useMainView();
  const [suggestedSendFundsDomains, setSuggestedSendFundsDomains] = useState<Array<DomainPresenterType>>([]);

  let [rows, setRows] = useState(null);

  useEffect(() => {
    const test = favoriteDomains.filter(domain => !domain.isAvailable && !domain.isYourOwn);
    setSuggestedSendFundsDomains(
      test
    );

    setRows(favoriteDomains ?
      favoriteDomains.map((domain, i) => (
        <>
          <SplitContainer key={i} leftWeight={8} rightWeight={4} handleClick={
            domain && !domain.isYourOwn && domain.isOnSale ?
              (event) => open(event)("modal-search-result-for-sale")({ domain: domain, suggestedDomains: suggestedSendFundsDomains })(null) :
              (
                domain && !domain.isYourOwn && !domain.isOnSale && domain.isAvailable ? () => {
                  setFoundDomain(domain), setCurrentView("REGISTER_FAVORITES_DOMAIN")
                } : null
              )}>
            <LeftSide domain={domain} />
            <RightSide domain={domain} />
          </SplitContainer>
        </>
      )) : <></>);
  }, [isFavoriteLoaded, favoriteDomains])

  return (
    isFavoriteLoaded ? <>
      {rows}
      <ModalManager />
    </> : <LoadingOverlay />
  );
}


const ModalManager: React.FC = () => {
  const { current, close } = useModalContext();

  return (
    <>
      <BuyBans isShown={current == "modal-search-result-for-sale"} closeModal={close} />
    </>
  );
}