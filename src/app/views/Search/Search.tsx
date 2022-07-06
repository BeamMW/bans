import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container,Flex,Text } from 'theme-ui';
import { SearchResult } from './components/SearchResult/SearchResult';
import Input from '@app/components/Input';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import { useBansApi, useMainView } from '@app/contexts/Bans/BansContexts';
import { useSelector } from 'react-redux';
import { selectPublicKey, selectSystemState } from '@app/store/SharedStore/selectors';
import Button from '@app/components/Button';

import SearchIcon from "@app/assets/icons/search.svg";
import RemoveIcon from "@app/assets/icons/remove.svg";
import Sell from '@app/assets/icons/send.svg';

const Search: React.FC = () => {
  const { foundDomain, setFoundDomain } = useMainView();
  const { registeredMethods } = useBansApi();

  const [isValid, setIsValid] = useState(true);
  const [search, setSearch] = useState(foundDomain ? foundDomain.name : "");
  const [isLoading, setIsLoading] = useState(false);

  const publicKey = useSelector(selectPublicKey());
  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp
  } = useSelector(selectSystemState());

  const searchValidator = useCallback((search) => {
    if (search.length < 3) return false;
    
    if(!search.match(/^[a-zA-Z0-9\-\_\~]*$/i)) return false;
    
    return true;
  }, []);

  const fetchDomain = async (search, currentStateTimestamp, currentStateHeight) => {
    if (!isValid) {
      setFoundDomain(null)
      return;
    }

    const response = await registeredMethods.managerViewName({ name: search });

    if (Object.keys(response).length !== 0 && response.res?.error) {
      return response.error /* && setIsValid(true) */;
    }

    Object.keys(response).length !== 0 && response?.hExpire && setFoundDomain(
      { ...response, ...{ searchName: search } },
      currentStateTimestamp,
      currentStateHeight,
      publicKey
    );

    Object.keys(response).length === 0 && setFoundDomain(
      { searchName: search, isAvailable: true },
      currentStateTimestamp,
      currentStateHeight,
      publicKey
    );

  }

  //@TODO: maybe refactor this logic into another
  //when component re-render we check is foundedDomain object exists
  useEffect(() => {
    //if search already exists
    !!foundDomain && (
      setSearch(foundDomain.name),
      setIsValid(true)
    );
  }, []);

  useEffect(() => {
    if (!search || !search.length) return;

    fetchDomain(search, currentStateTimestamp, currentStateHeight).catch((error) => {
      setIsValid(false);
      console.error
    });
  }, [search, currentStateTimestamp, currentStateHeight]);

  const handleChange = (e) => {
    searchValidator(e.target.value) ? setIsValid(true) : setIsValid(false);
    setSearch(e.target.value);
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
        pattern="[A-Za-z0-9]"
      >
        {search ? <RemoveIcon onClick={() => setSearch('')} /> : <SearchIcon />}
      </Input>
      {search || foundDomain ? <SearchResult search={search} isValid={isValid} isLoading={isLoading} /> : <></>}

      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{ display:'inline-block', my:'30px' }}>or</Text>
        <Button>
          <Sell/>
          send funds to the BANS
        </Button>
      </Flex>

      {/* <Notification /> */}
    </Container>
  );
};

export default Search;
