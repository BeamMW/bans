import React from 'react';
import { IconLogo } from '@app/shared/icons';
import { styled } from '@linaria/react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4.9375rem;
    width: 100%;
`;
const Text = styled.span`
    color: white;
    width: 100%;
    margin-top: 1.875rem;
    text-transform:uppercase;
    letter-spacing: 3.1px; 
    font-weight:700;
    text-align: center;
  margin-bottom: 3.125rem;
`;
function Emblem() {
  return (
    <Container>
      <IconLogo />
      <Text>Beam Anonymous Name Service</Text>
    </Container>
  );
}

export default Emblem;
