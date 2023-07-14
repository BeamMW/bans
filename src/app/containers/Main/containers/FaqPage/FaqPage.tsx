import React from 'react';
import {
  Header, Menu, Window,
} from '@app/shared/components';

function FaqPage(props) {
  return (
    <Window>
      <Header backBtn>
        <Menu />
      </Header>
        <div>faq</div>
    </Window>
  );
}

export default FaqPage;
