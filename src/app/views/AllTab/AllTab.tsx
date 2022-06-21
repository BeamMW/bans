import React from "react";
import { Flex, Text, Container } from "theme-ui";
import Button from "../../components/Button";
import { Popup } from "../../components/Popup/Popup";
import { SplitContainer } from "../../components/SplitContainer/SplitContainer";
import { SubText } from "../Search/components/SearchResult/SearchResult.styles";
import Copy from '././../../assets/icons/copy.svg';
import Dots from '././../../assets/icons/dots.svg';
import Renew from '././../../assets/icons/renew.svg';
import Sell from '././../../assets/icons/sell.svg';

interface LeftSideProps {
  name: string;
  expiresAt: string;
};

const LeftSide: React.FC<LeftSideProps> = ({ name, expiresAt }) => {
  return (
    <Flex sx={{ variant: 'layout.card' }}>
      <Text>{name}</Text>
      <SubText>{expiresAt}</SubText>
    </Flex>
  )
}

const RightSide: React.FC = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  return (
    <>
      <Container sx={{ position: 'relative' }}>
        <Flex>
          <Button variant='icon' pallete='transparent'>
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
  return (
    <>
      {
        domains.map((domain, i) => {
          return (
            <>
            <SplitContainer key={i} leftWeight={12} rightWeight={0}>
              <LeftSide name={domain.name} expiresAt={`Block expire ${domain.hExpire}`} />
              <RightSide />
            </SplitContainer>
            <Flex sx={{marginBottom:"10px"}}></Flex>
            </>
          );
        })
      }
    </>
  );
}