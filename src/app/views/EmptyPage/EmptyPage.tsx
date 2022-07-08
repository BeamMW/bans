import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'theme-ui';
import EmptyPageIcon from '@app/assets/icons/empty-page.svg';

const Container = styled(Flex)`
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      width: 95%;
`

const EmptyPage: React.FC<any> = ({emptyText}) => {
  const text = emptyText || "You do not hold any domains";
  
  return (
    <>
    <Container>
      <EmptyPageIcon style={{filter:' brightness(50%)', marginBottom: '30px'}}/>
      <Text sx={{color: 'rgba(255,255,255,0.5)'}}>{text}</Text>
    </Container>
    </>
  );
}

export default EmptyPage;