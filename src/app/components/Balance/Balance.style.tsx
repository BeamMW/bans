import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: auto auto;
    border-radius: 10px;
    padding: 20px;

    & .description {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 7px;
    }
    
    & .withdraw {
      align-self: end;
      display: flex;
      justify-content: flex-end;
    }
`
