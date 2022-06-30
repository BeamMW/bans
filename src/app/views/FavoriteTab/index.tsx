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

interface RightSideProps {
  isAvailable: boolean;
}
const RightSide: React.FC<RightSideProps> = ({isAvailable}) => {
  const [showPopup, setShowPopup] = React.useState(false);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex>
          <Text {...{}/* isAvailable some logic */}>{isAvailable ? "available" : "not available"}</Text>
        </Flex>
      </Container>
    </>
  )
}
export const FavoriteTab = (props) => {
  const isFavoriteLoaded = useSelector(selectIsFavoriteLoaded())
  const favoriteBans = useSelector(selectFavoritesBans())
  let [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(favoriteBans ?
    favoriteBans.map((domain, i) => (
      <SplitContainer key={i} leftWeight={11} rightWeight={1}>
        <LeftSide domain={domain} />
        <RightSide isAvailable={false} />
      </SplitContainer>
  )) : <></>);
  }, [isFavoriteLoaded])

  return (
    isFavoriteLoaded ? <>{rows}</> : <LoadingOverlay/>
  );
}