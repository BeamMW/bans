import React from 'react';
import styled from 'styled-components';
import Beam from '../../assets/icons/beam.svg';
import { Flex, Text } from 'theme-ui';
import { Decimal } from '@app/library/base/Decimal';
import { useSelector } from 'react-redux';
import { selectRate } from '@app/store/BansStore/selectors';

interface AmountProps {
  size: string,
  value: string,
  showConvertedToUsd?: boolean,
  equalizer?: any
};

interface ContainerStyles {
  size: string,
}

const Container = styled.div<ContainerStyles>`
  font-size: ${props => props.size};
  font-weight: 700;
  display: flex;
  font-family: 'SFProDisplay', sans-serif;
  font-weight: bolder;
  margin-right: 4px;

  & .text {
    font-size: ${props => props.size};
  }

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`

const UsdEqualizer: React.FC<{ equalizer: any }> = ({ equalizer }) => (
  <Flex sx={{ px: "20px", opacity: 0.5, fontSize: "14px", fontWeight: "300" }}>
    <Text>
      {equalizer()} USD
    </Text>
  </Flex>
);


export const Amount: React.FC<AmountProps> = ({ size, value, showConvertedToUsd = false }) => {
  const getIconStyles = () => {
      return {
        'width': `${parseInt(size.substring(0, size.length-2)) + 6}px`
      }
  }

  const beamPrice = useSelector(selectRate());
  const usdConvertedPrice = showConvertedToUsd ? beamPrice.mul(Decimal.from(value).toString()).prettify(2) : null;

  return (
    <Container size={size}>
    <Beam style={getIconStyles()} />
    <div>
      <Text variant='text' className='text'>{ value } BEAM</Text>
      {
       showConvertedToUsd && <Text variant='subText'><>{ usdConvertedPrice } USD</></Text>
      }
    </div>
  </Container>
  )
}



