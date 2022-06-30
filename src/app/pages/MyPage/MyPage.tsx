import React, { useMemo } from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { FilterTabs } from '../../views/filterTabs/FilterTabs';
import EmptyPage from '../../views/EmptyPage/EmptyPage';
import { AllTab } from '../../views/AllTab/AllTab';
import { useBansApi } from '@app/contexts/Bans/BansContexts';
import { useState } from 'react';
import { useEffect } from 'react';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import useGetFavoritesDomains from '@app/hooks/useGetFavoritesDomains';
import { FavoriteTab } from '@app/views/FavoriteTab';
import { getDomainPresentedData } from '@app/library/bans/DomainPresenter';
import { useSelector } from 'react-redux';
import { selectPublicKey, selectSystemState } from '@app/store/SharedStore/selectors';


const tabs = [{ id: 1, name: 'All' }, { id: 2, name: 'Favorite' }];

const MyPage = () => {
  const [myKey, setMyKey] = useState(null);
  const [domains, setDomains] = useState(null);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { registeredMethods } = useBansApi();

  const publicKey = useSelector(selectPublicKey());
  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp
  } = useSelector(selectSystemState());


  //refactor remove duplication
  useEffect(() => {
    registeredMethods && registeredMethods.userMyKey().then(response => setMyKey(
      response.key
    ));
  }, [registeredMethods]);

  useEffect(() => {
    setIsLoading(true);

    active === 1 && myKey && registeredMethods.userView().then(response => {
      setDomains(response.domains.map(
        //for future logic
        domain => getDomainPresentedData(
          { ...domain, ...{ searchName: domain.name } },
          currentStateTimestamp,
          currentStateHeight,
          publicKey
        )
      ));
    });

    active === 2 && useGetFavoritesDomains().then(response => {
      setDomains(response.domains.map(
        //for future logic
        domain => getDomainPresentedData(
          { ...domain, ...{ searchName: domain.name } },
          currentStateTimestamp,
          currentStateHeight,
          publicKey
        )
      ));
    });

    setIsLoading(false);
  }, [myKey, active, currentStateHeight, currentStateTimestamp])

  // TODO: add condition when there is no domains and for that case not show filterTabs
  return (
    <>
      <PageTitle title='My Page' />
      {domains &&
        <FilterTabs tabs={tabs} active={active} setActive={setActive} />
      }
      {
        domains ? (
          +active == 1 ?
            <AllTab domains={domains} /> :
            (active == 2 ? <FavoriteTab domains={domains} /> : <></>)
        ) : <EmptyPage />
      }
      {isLoading && <LoadingOverlay />}
    </>
  );
}

export default MyPage;