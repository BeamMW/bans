import React, { useEffect, useState } from "react";
import { Flex, Text, Container, Box } from "theme-ui";
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
import useOnClickOutside from '@app/hooks/outsideClickHandlers/useOnClickOutside';

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
    console.log('called')
    setShowPopup({
      [domain.name]: false
    });
  }

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <Container sx={{ position: 'relative' }}
      >
        <Flex sx={{ justifyContent: 'flex-end', alignItems: "baseline" }}>
          {
            !domain.isYourOwn && !domain.isOnSale && !domain.isAvailable &&
            <Button variant="ghostBordered" pallete="green" style={{ margin: '0 20px 0 20px' }} onClick={
              (event) => open(event)("modal-send-funds")({ domain: domain, suggestedDomains: suggestedSendFundsDomains })(null)
            }>
              <SendGreenIcon />
              send funds
            </Button>
          }
          {
            !domain.isYourOwn && domain.isOnSale && <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString()} size="14px" />
          }
          <Button variant='icon' pallete='transparent' onClick={() => openModal(domain.name)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup[domain.name]}>
          <PopupItem onClick={heartHandler} ref={ref}>
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
          <SplitContainer key={i} leftWeight={8} rightWeight={4}>
            <Box onClick={
              domain && !domain.isYourOwn && domain.isOnSale ?
                (event) => open(event)("modal-search-result-for-sale")({ domain: domain })(null) :
                (
                  domain && !domain.isYourOwn && !domain.isOnSale && domain.isAvailable ? () => {
                    setFoundDomain(domain), setCurrentView("REGISTER_FAVORITES_DOMAIN")
                  } : null
                )}>
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