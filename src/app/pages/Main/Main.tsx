import React, { useState } from 'react';
import { Flex } from 'theme-ui';
import { Register } from '../../views/Register/Register';
import Search from "../../views/Search/Search";
import LogoIcon from "../../assets/icons/logo.svg";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useMainView } from '@app/contexts/Bans/BansContexts';

const Main = () => {
  const { view } = useMainView();

  return (
    <>
      <Flex sx={{ justifyContent: 'center', mt: 79, mb: 50 }}>
        <PageHeader icon={LogoIcon} title='Beam Anonymous Name Service' />
      </Flex>
      {
        view === "SEARCH" ? <Search /> : (view === "REGISTER" ? <Register /> : <></>)
      }
    </>
  );
}

export default Main;