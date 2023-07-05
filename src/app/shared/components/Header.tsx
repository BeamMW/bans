import React from 'react';
import { styled } from '@linaria/react';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    position: relative;
`;

const Header: React.FC = ({ children }) => (
  <Container>{children}</Container>
);

export default Header;
