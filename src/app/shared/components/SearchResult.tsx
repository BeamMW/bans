import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SplitContainer } from '@app/shared/components/index';
import { styled } from '@linaria/react';
import { selectSearchDomain } from '@app/containers/Main/store/selectors';
import { useSelector } from 'react-redux';

export interface SearchResultProps {
  isValid?: boolean;
  search?: string;
  isLoading?: boolean;
}
const Container = styled.div`
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      margin-top: 3.75rem;
    `;
const Title = styled.div`
      color: #FFF;
      text-align: center;
      font-size: 0.875rem;
      font-family: 'SFProDisplay', sans-serif ;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.19444rem;
      text-transform: uppercase;
    `;
const ResultContainer = styled.div<SearchResultProps>`
      max-width: 39.375rem;
      width: 100%;
      height: 4.9375rem;
      border-radius: 0.625rem;
      border: 2px solid ${({ isValid }) => (isValid === true ? '#00F6D2' : '#FF746B')};
      background: rgba(255, 255, 255, 0.05);
      margin-top: 1.25rem;
      display: flex;
      align-items: center;
      padding: 0 1.5rem 0 1.88rem;
    `;
const Search = styled.div`
      color: #FFF;
      font-size: 1rem;
      font-family: 'SFProDisplay', sans-serif;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      display: flex;
`;
const Domain = styled.div`
  color: #FFF;
  font-size: 1rem;
  font-family: 'SFProDisplay', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: .5;
`;

const SearchResult: React.FC<SearchResultProps> = ({ search, isValid }: SearchResultProps) => {
  const beam = '.beam';
  console.log(isValid)
  return (
    <Container>
      {
                search && (
                <Title>Results</Title>
                )
            }
      <ResultContainer isValid={isValid}>
        <Search>
          {search}
          <Domain>{beam}</Domain>
        </Search>
      </ResultContainer>
    </Container>
  );
};
export default SearchResult;
