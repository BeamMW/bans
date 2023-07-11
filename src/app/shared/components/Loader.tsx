import React from 'react';
import { Window } from '@app/shared/components/index';
import {LoadingBans, LoadingBansStatic} from '@app/shared/icons';
import { styled } from '@linaria/react';

const Description = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  // width: ${({ isSearchable }) => (isSearchable ? '256px' : '281px')} 256px;
   margin-top: 54px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  width: 100%;
  min-height: 600px;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  @media (max-width: 480px){
    padding: 5px;
    max-width: 914px;
    width: 100%;
  }
`;

function Loader() {
  return (
    <Window>
      <Container>
        <LoadingBansStatic />
        <Description>
          Please wait, BeamX DEX DApp is loading...
        </Description>
      </Container>
    </Window>
  );
}

export default Loader;
