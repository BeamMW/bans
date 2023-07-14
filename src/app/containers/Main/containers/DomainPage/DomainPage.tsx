import React, { useEffect, useState } from 'react';
import {
  Header, Menu, Section, Window,
} from '@app/shared/components';
import { PageTitle } from '@app/shared/components/PageTitle';
import { FilterTabs } from '@app/shared/components/filterTabs/FilterTabs';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDomains } from '@app/containers/Main/store/selectors';
import { IDomains } from '@app/shared/interface';
import EmptyPage from '@app/shared/components/EmptyPage';
import RenewModal from '@app/shared/components/RenewModal';
import {useModal} from '@app/shared/hooks';

const DomainPage:React.FC = (props) => {
  const domains = useSelector(selectUserDomains());
  const tabs = [{ id: 1, name: 'All' }, { id: 2, name: 'Favorites' }];
  const { state } = useLocation();
  const { active: activeLocation } = state || { active: 1 }; // Read values passed on stat
  const [active, _setActive] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const setActive = (value) => {
    setIsLoaded(false);
    return _setActive(value);
  };

  useEffect(() => {
    setIsLoaded(false);
    activeLocation ? setActive(activeLocation) : setActive(1);
  }, [activeLocation]);
  console.log(domains.length);
  console.log(active);

  const renderAll = () => (domains.length ? domains.map(({ name, hExpire }:IDomains) => (<Section domain={name} hExpire={hExpire} key={name} />)) : <EmptyPage />
  );
  const renderFavorites = () => <EmptyPage emptyText='You do not have any favorites domains'/>
  const renderContains = () => {
    switch (active) {
      case 1:
        return renderAll();
      case 2:
        return renderFavorites();
      default:
        return renderAll();
    }
  };


  return (
    <Window>
      <Header backBtn>
        <Menu />
      </Header>
      <PageTitle title="My Domain" />
      <FilterTabs tabs={tabs} active={active} setActive={_setActive} />
      {renderContains()}
    </Window>
  );
};

export default DomainPage;
