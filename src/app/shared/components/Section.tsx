import React, { useState } from 'react';
import { styled } from '@linaria/react';

import { Button, Popup, SellModal } from '@app/shared/components/index';
import {
  IconDots, IconRenew, IconSell, IconTransfer,
} from '@app/shared/icons';
import { useModal } from '@app/shared/hooks';
import RenewModal from '@app/shared/components/RenewModal';
import { IDomains } from '@app/shared/interface';
import TransferModal from '@app/shared/components/TransferModal';

interface SectionProps {
  domain: string;
  hExpire?: string | number;
}

interface RightSideProps {
  domain: string;
  domainsToSell?: any;
  hExpire: number;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  height: 79px;
  border-radius: 10px;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.05);
  align-items: center;
  padding: 0 1.5rem 0 1.88rem;
  position: relative;
  margin-bottom: 0.625rem;
  max-width: 80rem;
}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DomainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DomainWrapper = styled.div`
display: flex;
`;
const DomainInfo = styled.div`
  color: #FFF;
  font-family: SFProDisplay, sans-serif;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
  margin-top: 0.3125rem;
`;
const DomainName = styled.div`
      color: #FFF;
      font-size: 1rem;
      font-family: 'SFProDisplay', sans-serif;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
`;
const Domain = styled.div`
      color: #FFF;
      font-size: 1rem;
      font-family: 'SFProDisplay', sans-serif;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      opacity: .5;
`;

const RightSide = styled.div`
  display: flex;
  position: absolute;
  right: 1.5rem;
  align-items: center;
  top: 0.9375rem;
`;

export const PopupItem = styled.div`
      color: #fff;
      padding: 6px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      line-height: normal !important;
      white-space: nowrap;
      z-index: 999;
      position: relative;
      &:hover {
        color: #00f6d2;
      }

      & > svg {
        margin-right: 10px
      }
`;
const ContainerDots = styled.div`
position: relative;
`;
const Dots: React.FC<RightSideProps> = ({ domain, hExpire }) => {
  const [showPopup, setShowPopup] = React.useState(null);
  const { isShowing, onOpen, onClose } = useModal(false);
  // const { open } = useModalContext();
  const [current, setCurrent] = useState('');

  const hideTip = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ContainerDots
        onMouseLeave={hideTip}
      >
        <RightSide>
          <Button icon={IconDots} variant="icon" pallete="transparent" onClick={() => setShowPopup(!showPopup)} />
        </RightSide>
        <Popup isVisible={showPopup}>
          <PopupItem onClick={onOpen}>
            <IconRenew width={20} />
            renew subscription
          </PopupItem>
          <PopupItem onClick={() => setCurrent('sell-modal')}>
            <IconSell width={20} />
            sell
          </PopupItem>
          <PopupItem onClick={() => setCurrent('transfer-modal')}>
            <IconTransfer width={20} />
            transfer
          </PopupItem>
        </Popup>
      </ContainerDots>
      <RenewModal isShown={isShowing} onClose={onClose} domain={{ name: domain, hExpire } as IDomains} />
      <TransferModal isShown={current === 'transfer-modal'} onClose={() => setCurrent('')} domain={domain} />
      <SellModal isShown={current === 'sell-modal'} onClose={() => setCurrent('')} />
    </>
  );
};

const Section: React.FC<SectionProps> = ({ domain }) => {
  const beam = '.beam';

  return (
    <Container>
      <SearchContainer>
        <DomainContainer>
          <DomainWrapper>
            <DomainName>{domain}</DomainName>
            <Domain>{beam}</Domain>
          </DomainWrapper>
          <DomainInfo>Expires on August 29, 2022</DomainInfo>
        </DomainContainer>
        <RightSide>
          <Dots domain={domain} />
        </RightSide>
      </SearchContainer>

    </Container>
  );
};

export default Section;
