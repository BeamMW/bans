import React from 'react';
import { Flex } from 'theme-ui';
import { Register } from '../../views/Register/Register';
import Search from "../../views/Search/Search";
import LogoIcon from "../../assets/icons/logo.svg";
import { PageHeader } from '../../components/PageHeader/PageHeader';

const Main = () => {
  // TODO: Add condition to show Register or Search
  const [fakeCondition] = React.useState(true);
  
  
  return (
    <>
      <Flex sx={{ justifyContent:'center', mt: 79, mb:50 }}>
        <PageHeader icon={LogoIcon} title='Beam Anonymous Name Service' />
      </Flex>
    {
      fakeCondition ? <Search /> : <Register />
    }
    </>
  );
}

export default Main;