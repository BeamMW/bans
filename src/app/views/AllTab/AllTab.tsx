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
  copyToClipboard: (value: string) => void;
  domainName: string;
}
const RightSide: React.FC<RightSideProps> = ({ copyToClipboard, domainName }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex>
          <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domainName)}>
            <Copy />
          </Button>
          <Button variant='icon' pallete='transparent' onClick={() => setShowPopup(!showPopup)}>
            <Dots />
          </Button>
        </Flex>
        <Popup isVisible={showPopup}>
          <div className="item">
            <Renew />
            renew subscription
          </div>
          <div className="item">
            <Sell />
            sell BANS
          </div>
        </Popup>
      </Container>
    </>
  )
}
export const AllTab: React.FC<{ domains: any }> = (props) => {
  const { domains } = props;
  //This name is in grace period, and needs to be renewed by June 30, 2022

  const rows = 
    domains.map((domain, i) => (
      <SplitContainer key={i} leftWeight={12} rightWeight={0}>
        <LeftSide isExpired={false} name={domain.name} expiresAt={`Block expire ${domain.hExpire}`} />
        <RightSide copyToClipboard={copyToClipboard} domainName={domain.name}/>
      </SplitContainer>
  ));

  return (
    <>
      {rows}
    </>
  );
}