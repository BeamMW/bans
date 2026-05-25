import React, { useEffect, useState } from "react";
import { Flex, Container, Box } from "theme-ui";
import { useSelector } from "react-redux";

import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { selectIsFavoriteLoaded } from "@app/store/BansStore/selectors";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { Amount } from "@app/components/Amount/Amount";
import BeamDappConnector from "@core/BeamDappConnector.js";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { BuyBans } from "../Modals/BuyBans";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { useBuyDomainTransaction } from "@app/hooks/useBuyDomainTransaction";
import { useFavoriteDomainBuyingEffects } from "@app/hooks/useFavoriteDomainBuyingEffects";
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

const FavoriteDomainRow: React.FC<{
  domain: DomainPresenterType;
  showPopup: IPopup;
  setShowPopup: (data: IPopup) => void;
  openPopup: (id: string) => void;
  suggestedSendFundsDomains: Array<DomainPresenterType>;
  setFoundDomain: (d: DomainPresenterType) => void;
  setCurrentView: (v: string) => void;
}> = ({
  domain,
  showPopup,
  setShowPopup,
  openPopup,
  suggestedSendFundsDomains,
  setFoundDomain,
  setCurrentView,
}) => {
  const { open } = useModalContext();
  const [sendBuy] = useBuyDomainTransaction(
    !domain.isYourOwn && domain.isOnSale ? domain : undefined,
  );

  const handleRowClick = (event: React.MouseEvent) => {
    if (!domain.isYourOwn && domain.isOnSale) {
      if (domain.isExpired === false) {
        open(event)("modal-search-result-for-sale")({ domain })(null);
      } else {
        void sendBuy();
      }
      return;
    }
    if (!domain.isYourOwn && !domain.isOnSale && domain.isAvailable) {
      setFoundDomain(domain);
      setCurrentView("REGISTER_FAVORITES_DOMAIN");
    }
  };

  return (
    <SplitContainer
      leftWeight={8}
      rightWeight={4}
      handleClick={handleRowClick}
    >
      <Box>
        <LeftSide domain={domain} showSaleIcon={false} showBelonging={true} />
      </Box>
      <RightSide
        domain={domain}
        showPopup={showPopup}
        openModal={openPopup}
        setShowPopup={setShowPopup}
        suggestedSendFundsDomains={suggestedSendFundsDomains}
      />
    </SplitContainer>
  );
};

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
            !domain.isYourOwn && !domain.isOnSale && !domain.isAvailable && !domain.isExpired &&
            <Button variant="ghostBordered" pallete="green" onClick={
              (event) => open(event)("modal-send-funds")({ domain: domain, suggestedDomains: suggestedSendFundsDomains })(null)
            }>
              <SendGreenIcon />
              send funds
            </Button>
          }
          {
            !domain.isYourOwn && domain.isOnSale && <Amount value={BeamDappConnector.grothToBeam(domain.price.amount)} size="14px" showConvertedToUsd={true} />
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
  const isFavoriteLoaded = useSelector(selectIsFavoriteLoaded);
  const { setFoundDomain, setCurrentView } = useMainView();
  useFavoriteDomainBuyingEffects();
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
        <React.Fragment key={domain.name ?? i}>
          <FavoriteDomainRow
            domain={domain}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            openPopup={openPopup}
            suggestedSendFundsDomains={suggestedSendFundsDomains}
            setFoundDomain={setFoundDomain}
            setCurrentView={setCurrentView}
          />
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