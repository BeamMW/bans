import React, { useCallback, useMemo, useState } from 'react';
import { Container } from 'theme-ui';
import SearchIcon from "../../assets/icons/search.svg";
import RemoveIcon from "../../assets/icons/remove.svg";
import { SearchResult } from './components/SearchResult/SearchResult';
import Input from '../../components/Input';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import { useBansApi, useBansView } from '@app/contexts/Bans/BansContexts';



const Search: React.FC = () => {
  const {search, setSearch} = useBansView();
  const [isValid, setIsValid] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [expireBlock, setExpireBlock] = useState(0);
  
  const {registeredMethods} = useBansApi();

  const searchValidator = useCallback((search) => {
    console.log(search);
    if(search.length < 3) return false;

    return true;
  }, []);

  const fetchDomain = async (search) => {

    if(!isValid) return;

    const response = await registeredMethods.managerViewName({name:search});
    
    if(Object.keys(response).length !== 0 && response.res?.error) {
      response.error && setIsValid(false);
    }

    setIsAvailable(Object.keys(response).length === 0 ? true : false);
    
    Object.keys(response).length !== 0 && response?.hExpire && setExpireBlock(response?.hExpire)

  }
  
  useEffect(() => {
    if(!search.length) return;

    fetchDomain(search).catch((error) => {
      setIsAvailable(false);
      setIsValid(false);
      console.error
    });    
  }, [search]);

  const handleChange = (e) => {
    searchValidator(e.target.value) ? setIsValid(true) : setIsValid(false);
    setSearch(e.target.value);
  }

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 100,{leading:false, trailing:true})
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
        { search ? <RemoveIcon onClick={() => setSearch('')}/> : <SearchIcon/> }
      </Input>
      <SearchResult value={search} expireBlock={expireBlock} isAvailable={isAvailable} isValid={isValid} />
    </Container>
  );
};

export default Search;
