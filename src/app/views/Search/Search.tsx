import React, { useMemo, useState } from 'react';
import { Container } from 'theme-ui';
import SearchIcon from "../../assets/icons/search.svg";
import RemoveIcon from "../../assets/icons/remove.svg";
import { SearchResult } from './components/SearchResult/SearchResult';
import Input from '../../components/Input';



const Search:React.FC = () => {
const [value, setValue] = useState('');
const [searchField, setSearchField] = useState("");

/* const filteredDomains = useMemo(() => {
  return details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );
}, [searchField]); */

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  setSearchField(e.target.value);
  setValue(e.target.value)
}

  return (
    <Container sx={{ maxWidth: 630 }}>
        <Input
        variant='proposal'
        pallete='white'
        icon={value ? RemoveIcon : SearchIcon}
        onChange={handleChange}
        value={value} 
        maxLength={30}
        pattern="[A-Za-z0-9]"
        />
        <SearchResult value={value} isAvailable={false} isValid={false} />
    </Container>
  );
};

export default Search;
