import React from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { FilterTabs } from '../../views/filterTabs/FilterTabs';
import EmptyPage from '../../views/EmptyPage/EmptyPage';
import { AllTab } from '../../views/AllTab/AllTab';

const tabs = [{ id: '1', name: 'All' }, { id: '2', name: 'Favorite' }];

const MyPage = () => {
  const [active, setActive] = React.useState('1');
// TODO: add condition when there is no domains and for that case not show filterTabs
  return (
    <>
    <PageTitle title='My Page' />
    <FilterTabs tabs={tabs} active={active} setActive={setActive}/>
    {
      active ? <AllTab/> : <EmptyPage/>
    }
    </>
  );
}

export default MyPage;