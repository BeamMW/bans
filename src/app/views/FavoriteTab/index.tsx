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
import Copy from '@app/assets/icons/copy.svg';
import { copyToClipboard } from '../../core/appUtils';

interface RightSideProps {
  domain: DomainPresenterType;
}
const RightSide: React.FC<RightSideProps> = ({ domain }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex sx={{ justifyContent: 'flex-end', alignItems: "baseline" }}>
          <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button>
          {
            !domain.isYourOwn && domain.isOnSale && <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString()} size="14px" />
          }
          <Text sx={{ color: domain.isAvailable || domain.isYourOwn ? "#00F6D2" : "#FF746B" }}>{
            domain.isYourOwn ?
              "your already own" :
              (
                domain.isAvailable && !domain.isOnSale ?
                  "available" :
                  (
                    domain.isOnSale ?
                      "on sale" :
                      "not available"
                  )
              )
          }</Text>
        </Flex>
      </Container>
    </>
  )
}

export const FavoriteTab = ({ domains: favoriteBans }) => {
  const isFavoriteLoaded = useSelector(selectIsFavoriteLoaded());

  const { open } = useModalContext();
  const { setFoundDomain, setCurrentView, view } = useMainView();

  let [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(favoriteBans ?
      favoriteBans.map((domain, i) => (
        <>
          <SplitContainer key={i} leftWeight={8} rightWeight={4} handleClick={
            domain && !domain.isYourOwn && domain.isOnSale ?
              (event) => open(event)("modal-search-result-for-sale")({ domain: domain })(null) :
              (
                domain && !domain.isYourOwn && !domain.isOnSale && domain.isAvailable ? () => {
                  setFoundDomain(domain), setCurrentView("REGISTER_FAVORITES_DOMAIN")
                } : null
              )}>
            <LeftSide domain={domain} showHeart={true} />
            <RightSide domain={domain} />
          </SplitContainer>
        </>
      )) : <></>);
  }, [isFavoriteLoaded, favoriteBans])

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