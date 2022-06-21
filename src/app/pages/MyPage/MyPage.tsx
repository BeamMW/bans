import React from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { FilterTabs } from '../../views/filterTabs/FilterTabs';
import EmptyPage from '../../views/EmptyPage/EmptyPage';
import { AllTab } from '../../views/AllTab/AllTab';
import { useBansApi } from '@app/contexts/Bans/BansContexts';
import { useState } from 'react';
import { useEffect } from 'react';
import { LoadingOverlay } from '@app/components/LoadingOverlay';


const tabs = [{ id: '1', name: 'All' }, { id: '2', name: 'Favorite' }];

const MyPage = () => {
  const [myKey, setMyKey] = useState(null);
  const [domains, setDomains] = useState(null);
  const { registeredMethods } = useBansApi();

  //TEMP SOLUTION!
  useEffect(() => {

    registeredMethods.user.myKey().then(response => setMyKey(
      response.key
    ));
  }, [registeredMethods])


  useEffect(() => {
    myKey && registeredMethods.manager.viewDomain().then(response => {
      setDomains(response.domains.filter(
        domain => domain.key === myKey
      ).map(
        //for future logic
        domain => domain
      )
      );
    }, [myKey])

  })

  const [active, setActive] = React.useState('1');

  // TODO: add condition when there is no domains and for that case not show filterTabs
  return (
    <>
      <PageTitle title='My Page' />
      {domains &&
        <FilterTabs tabs={tabs} active={active} setActive={setActive} />
      }
      {
        domains ? <AllTab domains={domains} /> : <EmptyPage />
      }
      {!domains && <LoadingOverlay />}
    </>
  );
}

export default MyPage;