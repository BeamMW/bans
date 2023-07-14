import React, { useMemo, useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import {
  Favorites, RegistrationPrice, RegistrationPeriod, Button,
} from '@app/shared/components/index';
import {
  IconRegistration, IconRemove, IconRenew, IconRenewBlue,
} from '@app/shared/icons';
import moment from 'moment';
import { extendDomain, registrDomain } from '@core/api';
import { IDomains } from '@app/shared/interface';

interface RegistrationsProps {
  nameDomain?: string,
  isRenew?: boolean,
  domain?: IDomains,
  onClose?: ()=> void
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 630px;
  width: 100%;
  //height: 326px;
  border-radius: 10px;
  border: 1px solid #000;
  background: rgba(255,255,255, .1);
  padding: 1.875rem 1.25rem 2.5rem 1.25rem;
  justify-items: center;
`;
const fragmentStyle = css`
`;

const RowContainer = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  align-items: center;
`;
const DomainWrapper = styled.div`
display: flex;
`;
const FavoriteContainer = styled.div`
    position: absolute;
    right: 0;
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
const Line = styled.div`
  width: 100%;
  height: 1px;
  background:rgba(255,255,255, .1);
  margin-top: 14px;
`;
const Title = styled.div`
  color: #8DA1AD;
  font-family: SFProDisplay, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RegistrationContainer = styled.div`
position: absolute;
  right: 0;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.875rem;
`;
const Description = styled.span`
  color: #FFF;
  text-align: center;
  font-family: SFProDisplay, sans-serif;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;`;

const ButtonContainer = styled(DescriptionContainer)``;
const Registration:React.FC<RegistrationsProps> = ({
  nameDomain, isRenew, domain, onClose,
}) => {
  const beam = '.beam';
  const [period, setPeriod] = useState<number>(1/* selectedDomain.alreadyexistingperiod */);
  const now = !isRenew ? moment().format('LL') : 'Current subscribe period';
  const till: string = useMemo(() => {
    //   TODO: Calculated and to format
    if (isRenew) {
      return `Current subscribe period + ${period} years`;
    }
    moment()
      .add(period, 'years')
      .format('LL');
  }, [period]);

  const onRegistration = () => {
    if (isRenew) {
      extendDomain({
        domain: domain.name,
        period,
      });
    } else { registrDomain({ domain: nameDomain, period }); }
  };
  return (
    <div className={isRenew ? fragmentStyle : containerStyle}>
      <RowContainer>
        <DomainWrapper>
          <DomainName>{isRenew ? domain.name : nameDomain}</DomainName>
          <Domain>{beam}</Domain>
        </DomainWrapper>
        <FavoriteContainer>
          <Favorites />
        </FavoriteContainer>
      </RowContainer>
      <Line />
      <RowContainer>
        <Title>
          Registration Period
        </Title>
        <RegistrationContainer>
          <RegistrationPeriod period={period} setPeriod={setPeriod} />
        </RegistrationContainer>
      </RowContainer>
      <RowContainer>
        <Title>
          Registration price
        </Title>
        <RegistrationContainer>
          <RegistrationPrice period={period} name={isRenew ? domain.name : nameDomain} />
        </RegistrationContainer>
      </RowContainer>
      <DescriptionContainer>
        <Description>{`Current domain will be available from ${now} till ${till}.`}</Description>
      </DescriptionContainer>
      {!isRenew ? (
        <ButtonContainer>
          <Button pallete="green" icon={IconRegistration} onClick={onRegistration}>
            register
          </Button>
        </ButtonContainer>
      )
        : (
          <ButtonContainer>
            <Button variant="ghost" icon={IconRemove} onClick={onClose}>close</Button>
            <Button icon={IconRenewBlue} onClick={onRegistration}>renew</Button>
          </ButtonContainer>
        )}
    </div>
  );
};

export default Registration;
