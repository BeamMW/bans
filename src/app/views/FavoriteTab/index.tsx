import React, { useEffect, useState } from "react";
import { Flex, Container, Box } from "theme-ui";
import { useSelector } from "react-redux";

import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { selectIsFavoriteLoaded } from "@app/store/BansStore/selectors";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { Amount } from "@app/components/Amount/Amount";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { BuyBans } from "../Modals/BuyBans";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import Button from "@app/components/Button";
import { Popup } from "@app/components/Popup/Popup";
import { useHandleHeartAction } from "@app/hooks/useHandleHeartAction";
import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";
import useOnClickOutside from '@app/hooks/outsideClickHandlers/useOnClickOutside';
import SendGreenIcon from '@app/assets/icons/send-green.svg';
import Heart from '@app/assets/icons/heart.svg';
import Dots from '@app/assets/icons/dots.svg';

import { PopupItem } from "@app/components/Popup/Popup.styles";

interface IPopup {
  [id: string]: boolean
}
interface RightSideProps {
  domain: DomainPresenterType;
  showPopup: IPopup;
  openModal: (name: string) => void;
  setShowPopup: (data: IPopup) => void;
  suggestedSendFundsDomains?: Array<DomainPresenterType>
}

const RightSide: React.FC<RightSideProps> = ({ domain, showPopup, openModal, setShowPopup, suggestedSendFundsDomains = [] }) => {
  const { open } = useModalContext();
  const isBansLove = useIsBansFavorite(domain.name);
  const heartHandler = useHandleHeartAction(isBansLove, domain.name);
  const ref = React.useRef(null);

  const handleClickOutside = () => {
    setShowPopup({
      [domain.name]: false
    });
  }

  useOnClickOutside(ref, handleClickOutside, heartHandler);

  return (
    <>
      <Container sx={{ position: 'relative' }}
      >
        <Flex sx={{ justifyContent: 'flex-end', alignItems: "center" }}>
          {
            !domain.isYourOwn && !domain.isOnSale && !domain.isAvailable &&
            <Button variant="ghostBordered" pallete="green" onClick={
              (event) => open(event)("modal-send-funds")({ domain: domain, suggestedDomains: suggestedSendFundsDomains })(null)
            }>
              <SendGreenIcon />
              send funds
            </Button>
          }
          {
            !domain.isYourOwn && domain.isOnSale && <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString()} size="14px" showConvertedToUsd={true} />
          }
          <Box sx={{ position: 'relative', zIndex: 999 }}>
            <Button variant='icon' pallete='transparent' onClick={(event) => { openModal(domain.name); event.stopPropagation() }}>
              <Dots />
            </Button>
          </Box>
        </Flex>
        <Popup isVisible={showPopup[domain.name]}>
          <PopupItem ref={ref}>
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
  const [showPopup, setShowPopup] = React.useState<IPopup>({});

  const openPopup = (id: string) => setShowPopup({ [id]: true });

  useEffect(() => {
    //@TODO: maybe it is not well optimized. We passed whole bunch of favorites domains every time to every row
    setSuggestedSendFundsDomains(
      favoriteDomains.filter(domain => !domain.isAvailable && !domain.isYourOwn)
    );

    setRows(favoriteDomains ?
      favoriteDomains.map((domain, i) => (
        <React.Fragment key={i}>
          <SplitContainer key={i} leftWeight={8} rightWeight={4} handleClick={
              domain && !domain.isYourOwn && domain.isOnSale ?
                (event) => open(event)("modal-search-result-for-sale")({ domain: domain })(null) :
                (
                  domain && !domain.isYourOwn && !domain.isOnSale && domain.isAvailable ? () => {
                    setFoundDomain(domain), setCurrentView("REGISTER_FAVORITES_DOMAIN")
                  } : null
                )}>
            <Box>
              <LeftSide domain={domain} showSaleIcon={false} showBelonging={true} />
            </Box>
            <RightSide domain={domain} showPopup={showPopup} openModal={openPopup} setShowPopup={setShowPopup} suggestedSendFundsDomains={suggestedSendFundsDomains} />
          </SplitContainer>
        </React.Fragment>
      )) : <></>);
  }, [isFavoriteLoaded, favoriteDomains, showPopup])

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