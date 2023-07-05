import React, { useEffect, useMemo, useState } from 'react';
import { IconRemove, IconSearch } from '@app/shared/icons';
import { Input, SearchResult } from '@app/shared/components/index';
import { styled } from '@linaria/react';
import {useDispatch, useSelector} from 'react-redux';
import { actions } from '@app/containers/Main/store';
import {selectIsValid, selectSearchDomain} from "@app/containers/Main/store/selectors";

const Container = styled.div`
display: flex;
  width: 100%;
  flex-direction: column;
`;
function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const isValid = useSelector(selectIsValid());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf('-') != -1 || e.target.value.indexOf('_') != -1 || e.target.value.indexOf('~') != -1) {
      return false;
    }

    setSearch(e.target.value.toLocaleLowerCase());
  };

  useMemo(() => {
    console.log(`SEARCJ  ${search}`);
    dispatch(actions.getDomainName.request(search));
  }, [search]);

  return (
    <Container>
      <Input
        variant="proposal"
        pallete="white"
        onChange={handleChange}
        value={search}
        maxLength={30}
        placeholder="Search a name"
      >

        {search ? <IconRemove style={{ cursor: 'pointer' }} onClick={() => setSearch('')} /> : <IconSearch />}
      </Input>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {search ? <SearchResult search={search} isValid={isValid} isLoading /> : <></>}
    </Container>
  );
}

export default Search;
