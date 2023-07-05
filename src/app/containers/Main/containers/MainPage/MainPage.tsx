import React from 'react';
import { styled } from '@linaria/react';
import {
  Emblem, Header, Menu, Window,
} from '@app/shared/components';
import Search from '@app/shared/components/Search';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  color: white;
`;

const MainPage: React.FC = () => (
  <Window>
    <Header>
      <Menu />
    </Header>
    <Emblem />
    <Search />
    <Container />
  </Window>
);

export default MainPage;
