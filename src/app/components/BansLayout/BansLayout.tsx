import React, { FC } from 'react'

import { Container } from 'theme-ui';
import Tabs from '../../views/navTabs/Tabs';

export interface BansLayoutProps {
  children?: React.ReactNode;
}
export const BansLayout: FC<BansLayoutProps> = ({ children }) => {

  return (
    <Container sx={{variant: 'layout.window'}}>
      <Tabs />
      {children}
    </Container>
  )

};
