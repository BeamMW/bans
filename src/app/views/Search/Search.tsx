import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container, Flex, Text } from 'theme-ui';
import { SearchResult } from './components/SearchResult/SearchResult';
import Input from '@app/components/Input';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import Button from '@app/components/Button';

import SearchIcon from "@app/assets/icons/search.svg";
import RemoveIcon from "@app/assets/icons/remove.svg";
import Sell from '@app/assets/icons/send.svg';
import { useFetchDomainAndConvert } from '@app/hooks/useFetchDomainAndConvert';
import { useSearchValidator } from '@app/hooks/useSearchValidator';
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import Notifications from '@app/views/Notifications/Notifications';

const Search: React.FC = () => {
  const { foundDomain, setFoundDomain } = useMainView();

  const [isValid, setIsValid] = useState(true);
  const [search, setSearch] = useState(foundDomain ? foundDomain.name : "");
  const [isLoading, setIsLoading] = useState(false);
  const {open} = useModalContext();

  useFetchDomainAndConvert(search)
    .then(domain => {
      setFoundDomain(domain);
      domain ? setIsValid(true) : setIsValid(false);
    })
    .catch(err => {
      setIsValid(false);
      console.error
    });

  //@TODO: maybe refactor this logic into another
  //when component re-render we check is foundedDomain object exists
  useEffect(() => {
    //if search already exists
    !!foundDomain && (
      setSearch(foundDomain.name),
      setIsValid(true)
    );
  }, []);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.indexOf('-') != -1 || e.target.value.indexOf('_') != -1 || e.target.value.indexOf('~') != -1) {
      return false;
    };
    setSearch(e.target.value.toLocaleLowerCase());
  }

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 100, { leading: false, trailing: true })
    , []);

  return (
    <Container sx={{ maxWidth: 630 }}>
      <Input
        variant='proposal'
        pallete='white'
        onChange={handleChange}
        value={search}
        maxLength={30}
        pattern="[a-z0-9]"
        placeholder='Search a name'
      >
        {search ? <RemoveIcon onClick={() => setSearch('')} /> : <SearchIcon />}
      </Input>
      {search || foundDomain ? <SearchResult search={search} isValid={isValid} isLoading={isLoading} /> : <></>}

      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: "20px" }}>
        <Text sx={{ display: 'inline-block', my: '30px' }}>or</Text>
        <Button onClick={(event) => open(event)("modal-send-funds")(null)(null)}>
          <Sell />
          send funds to the BANS
        </Button>
      </Flex>

      <Notifications/>

    </Container>
  );
};

export default Search;
