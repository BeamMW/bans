import React from 'react';
import styled from 'styled-components';
import Beam from '../../assets/icons/beam.svg';
import { Text } from 'theme-ui';

interface AmountProps {
  size: string,
  value: string,
  showConvertedToUsd?: boolean,
};

interface ContainerStyles {
  size: string,
}

const Container = styled.div<ContainerStyles>`
  font-size: ${props => props.size};

  display: flex;
  align-items: center;
  font-family: 'SFProDisplay', sans-serif;
  font-weight: bolder;
  margin-right: 6px;

  & .text {
    font-size: ${props => props.size};
  }

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

export const Amount: React.FC<AmountProps> = ({ size, value, showConvertedToUsd = false }) => {
  const getIconStyles = () => {
      return {
        'width': `${parseInt(size.substring(0, size.length-2)) + 6}px`
      }
  }
  return (
    <Container size={size}>
    <Beam style={getIconStyles()} />
    <div>
      <Text variant='text' className='text'>{ value } BEAM</Text>
      {
       showConvertedToUsd && <Text variant='subText'>{ value } USD</Text>
      }
    </div>
  </Container>
  )
}



