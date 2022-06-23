import React from "react";
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
export const FavoriteTab: React.FC<{ domains: any }> = (props) => {
  const { domains } = props;
  //This name is in grace period, and needs to be renewed by June 30, 2022

  const rows = 
    domains.map((domain, i) => (
      <SplitContainer key={i} leftWeight={11} rightWeight={1}>
        <LeftSide isExpired={false} name={domain.name} expiresAt={`Block expire ${domain.hExpire}`} />
        <RightSide isAvailable={false} />
      </SplitContainer>
  ));

  return (
    <>
      {rows}
    </>
  );
}