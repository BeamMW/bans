import React, { useMemo, useReducer } from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { FilterTabs } from '../../views/filterTabs/FilterTabs';
import EmptyPage from '../../views/EmptyPage/EmptyPage';
import { AllTab } from '../../views/AllTab/AllTab';
import { useBansApi, useMainView } from '@app/contexts/Bans/BansContexts';
import { useState } from 'react';
import { useEffect } from 'react';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import useGetFavoritesDomains from '@app/hooks/useGetFavoritesDomains';
import { FavoriteTab } from '@app/views/FavoriteTab';
import { getDomainPresentedData } from '@app/library/bans/DomainPresenter';
import { useSelector } from 'react-redux';
import { selectPublicKey, selectSystemState } from '@app/store/SharedStore/selectors';
import { Register } from '@app/views/Register/Register';


const tabs = [{ id: 1, name: 'All' }, { id: 2, name: 'Favorite' }];

const MyPage = () => {
  const [domains, setDomains] = useState(null);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { setFoundDomain, setCurrentView, view } = useMainView();

  const { registeredMethods } = useBansApi();

  const publicKey = useSelector(selectPublicKey());
  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp
  } = useSelector(selectSystemState());

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);

    active === 1 && publicKey && registeredMethods.userView().then(response => {
      !!domains && forceUpdate();

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
      !!domains && forceUpdate();

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
  }, [publicKey, active, currentStateHeight, currentStateTimestamp])

  // TODO: add condition when there is no domains and for that case not show filterTabs
  return (
    <>
      {
        view === "MYBANS" ? (
          <>
            <PageTitle title='My Page' />
            {domains &&
              <FilterTabs tabs={tabs} active={active} setActive={setActive} />
            }
            {
              domains ? (
                +active == 1 ?
                  <AllTab domains={domains} /> :
                  (active == 2 ? <FavoriteTab /> : <></>)
              ) : <EmptyPage />
            }
            {isLoading && <LoadingOverlay />}
          </>
        ) : (view === "MYBANS_REGISTER" ? <Register /> : <></>)
      }
    </>
  );
}

export default MyPage;