import React, { useEffect, useState } from "react";
import { Flex, Text, Container } from "theme-ui";
import Button from "../../components/Button";
import { Popup } from "../../components/Popup/Popup";
import { SplitContainer } from "../../components/SplitContainer/SplitContainer";
import Copy from '././../../assets/icons/copy.svg';
import Dots from '././../../assets/icons/dots.svg';
import Renew from '././../../assets/icons/renew.svg';
import Sell from '././../../assets/icons/sell.svg';
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { copyToClipboard } from '../../core/appUtils';
import { useSelector } from "react-redux";
import { selectFavoritesBans, selectIsFavoriteLoaded } from "@app/store/BansStore/selectors";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { HeartIcon } from "@app/assets/icons";
import { Amount } from "@app/components/Amount/Amount";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import { SearchResultForSale } from "../Search/components/SearchResult/SearchResultForSale";
import { useModal } from "@app/components/Modals/useModal";
interface RightSideProps {
  domain: DomainPresenterType;
}
const RightSide: React.FC<RightSideProps> = ({ domain }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex sx={{ justifyContent: 'flex-end' }}>
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

export const FavoriteTab = (props) => {
  const isFavoriteLoaded = useSelector(selectIsFavoriteLoaded())
  const favoriteBans = useSelector(selectFavoritesBans())
  const { isShown, toggle } = useModal();

  let [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(favoriteBans ?
      favoriteBans.map((domain, i) => (
        <>
          <SplitContainer key={i} leftWeight={9} rightWeight={3} handleClick={
            domain && !domain.isYourOwn && domain.isOnSale ?
              () => toggle() :
              null}>
            <LeftSide domain={domain} showHeart={true} />
            <RightSide domain={domain} />
          </SplitContainer>

        </>

      )) : <></>);
  }, [isFavoriteLoaded, favoriteBans])

  return (
    isFavoriteLoaded ? <>
      {rows}
      <SearchResultForSale isShown={isShown} toggleClose={toggle} />
    </> : <LoadingOverlay />
  );
}