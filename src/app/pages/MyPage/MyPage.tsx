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
import { selectSystemState } from '@app/store/SharedStore/selectors';
import { Register } from '@app/views/Register/Register';
import { selectFavoritesDomains, selectPublicKey, selectUserDomains } from '@app/store/BansStore/selectors';
import store from 'index';
import { reloadAllUserInfo } from '@app/store/BansStore/actions';


const tabs = [{ id: 1, name: 'All' }, { id: 2, name: 'Favorite' }];

const MyPage = () => {
  const [domains, setDomains] = useState(null);
  const [active, _setActive] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const setActive = (value) => {
    setIsLoaded(false);
    return _setActive(value);
  }

  const { view } = useMainView();


  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const favoriteBans = useSelector(selectFavoritesDomains());
  const userBans = useSelector(selectUserDomains());


  //@TODO:refactor fetching domains every time instead put in store!
  useEffect(() => {
    //@TODO:temporary solution! remove in the future
    store.dispatch(reloadAllUserInfo.request());
  }, [active])

  //@TODO:refactor as well
  useEffect(() => {
    !!domains && forceUpdate();

    active === 1 && setDomains(userBans);
    active === 2 && setDomains(favoriteBans);

    setIsLoaded(true);
  }, [/* active,  */userBans, favoriteBans])




  // TODO: add condition when there is no domains and for that case not show filterTabs
  return (
    <>
      {
        view === "MYBANS" ? (
          <>
            <PageTitle title='My Domains' />
            {!!domains &&
              <FilterTabs tabs={tabs} active={active} setActive={setActive} />
            }
            {isLoaded ? (
              domains && domains.length ? (
                +active == 1 ?
                  <AllTab domains={domains} /> :
                  (active == 2 ? <FavoriteTab domains={domains} /> : <></>)
              ) : <EmptyPage emptyText={active == 1 ? "You do not hold any domains" : (active == 2 ? "You do not have any favorites domains" : null)} />
            ) : <LoadingOverlay />
            }
          </>
        ) : (view === "MYBANS_REGISTER" ? <Register /> : <></>)
      }
    </>
  );
}

export default MyPage;