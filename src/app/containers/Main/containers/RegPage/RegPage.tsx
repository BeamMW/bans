import React from 'react';
import {
  Emblem, Header, Menu, Registration, Window,
} from '@app/shared/components';
import { useSelector } from 'react-redux';
import { selectRegistrationName } from '@app/containers/Main/store/selectors';

function RegPage() {
  const name = useSelector(selectRegistrationName());
  return (
    <Window>
      <Header backBtn>
        <Menu />
      </Header>
      <Emblem />
      <Registration nameDomain={name} />
    </Window>
  );
}

export default RegPage;
