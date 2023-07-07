import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Favorites, SplitContainer } from '@app/shared/components/index';
import { styled } from '@linaria/react';
import { selectSearchDomain } from '@app/containers/Main/store/selectors';
import { useSelector } from 'react-redux';

export interface SearchResultProps {
  isValid?: string;
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
      border: 2px solid ${({ isValid }) => (isValid === 'available' ? '#00F6D2' : '#FF746B')};
      background: rgba(255, 255, 255, 0.05);
      margin-top: 1.25rem;
      display: flex;
      align-items: center;
      padding: 0 1.5rem 0 1.88rem;
      position: relative;
    `;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DomainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DomainWrapper = styled.div`
display: flex;
`;
const DomainInfo = styled.div`
  color: #FFF;
  font-family: SF Pro Display;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
  margin-top: 0.3125rem;
`;
const DomainName = styled.div`
      color: #FFF;
      font-size: 1rem;
      font-family: 'SFProDisplay', sans-serif;
      font-style: normal;
      font-weight: 700;
      line-height: normal;


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

const RightSide = styled.div`
  display: flex;
  position: absolute;
  right: 1.5rem;
  align-items: center;
`;
const Available = styled.div<SearchResultProps>`
  color: ${({ isValid }) => (isValid === 'available' ? '#00F6D2' : '#FF746B')};;
  text-align: center;
  font-size: 0.875rem;
  font-family: 'SFProDisplay', sans-serif;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  margin-left: 1.25rem;
`;

const SearchResult: React.FC<SearchResultProps> = ({ search, isValid }: SearchResultProps) => {
  const beam = '.beam';
  return (
    <Container>
      {
                search && (
                <Title>Results</Title>
                )
            }
      <ResultContainer isValid={isValid}>
        <SearchContainer>
          <DomainContainer>
            <DomainWrapper>
              <DomainName>{search}</DomainName>
              <Domain>{beam}</Domain>
            </DomainWrapper>
            <DomainInfo>Expires on August 29, 2022</DomainInfo>
          </DomainContainer>
          <RightSide>
            <Favorites />
            <Available isValid={isValid}>
              {isValid}
            </Available>
          </RightSide>
        </SearchContainer>
      </ResultContainer>
    </Container>
  );
};
export default SearchResult;
