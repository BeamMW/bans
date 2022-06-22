import React, { useEffect } from "react";
import { Paragraph, Flex } from "theme-ui";
import {  SearchResultStyleProps, SubText } from './SearchResult.styles';
import { SplitContainer } from './../../../../components/SplitContainer/SplitContainer';
import { SearchResultLeft } from "./SearchResultLeft";
import { SearchResultRight } from './SearchResultRight';
import { useBansView } from "@app/contexts/Bans/BansContexts";

export interface SearchResultProps
  extends SearchResultStyleProps {
    isValid: boolean;
    value: string;
    isAvailable: boolean;
    expireBlock: number;
  };

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { isValid, isAvailable, expireBlock, value } = props;
  const isNotValid = !isValid;
  const {setView, setSearch} = useBansView();

  const proceedWithDomainHandler = () => {
    isAvailable && isValid && setView("REGISTER");
  }

  useEffect(()=>{
    setSearch(value);
  }, [value])

  return ( 
    <>
   { value && (
        <>
      <Paragraph variant="header">Results</Paragraph>
      <SplitContainer leftWeight={2} rightWeight={1} handleClick={proceedWithDomainHandler}>
        <SearchResultLeft  value={value + ".beam"} expireBlock={expireBlock} isAvailable={isAvailable} isValid={isValid}/>
        <SearchResultRight isAvailable={isAvailable} isValid={isValid}/>
         </SplitContainer>
         <Flex>
      {
        isNotValid && (
          <SubText sx={{fontSize: '14px'}}>Domain should contain only letters and numbers</SubText>
        )
      }
    </Flex>
      </>
   )}
    </>
);
}
