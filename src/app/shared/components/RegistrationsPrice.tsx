import React from 'react';
import { styled } from '@linaria/react';
import { PriceInfo } from '@app/shared/interface';
import { Amount } from '@app/shared/components/index';
import {beamNamePrice} from '@core/appUtils';
import {selectCurrentPrice, selectRate} from '@app/containers/Main/store/selectors';
import {useSelector} from 'react-redux';

interface PriceProps {
  price?: PriceInfo;
  period?: number;
  isOnSale?: boolean;
  name: string
}
const Container = styled.div`
  display: flex;
  margin-top: 24px;
  margin-bottom: 5px;
`;

const RegistrationPrice: React.FC<PriceProps> = ({ price, period,name }) => {
  const currentPrice = useSelector(selectRate());
  const computedPrice = beamNamePrice(name, currentPrice) * period;

  return (
    <Container>
      <Amount value={computedPrice} size="14px" showConvertedToUsd />
    </Container>
  );
};
export default RegistrationPrice;
