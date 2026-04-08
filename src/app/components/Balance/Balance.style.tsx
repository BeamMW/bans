import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    border-radius: 10px;
    padding: 20px;

    & .description {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 7px;
    }

    & .balance-main {
      justify-self: start;
      min-width: 0;
      max-width: 100%;
    }

    & .balance-rows {
      display: grid;
      grid-template-columns: auto auto auto;
      justify-items: start;
      column-gap: 8px;
      row-gap: 6px;
      align-items: center;
      width: max-content;
      max-width: 100%;
    }

    & .balance-rows .balance-asset-icon {
      margin-right: 0;
    }

    & .balance-cell--label {
      margin-right: 0;
      min-width: 0;
    }

    & .asset-amount {
      font-size: 20px;
      font-weight: 700;
      font-family: 'SFProDisplay', sans-serif;
      white-space: nowrap;
      text-align: right;
      font-variant-numeric: tabular-nums;
      justify-self: end;
    }
    
    & .withdraw {
      align-self: end;
      display: flex;
      justify-content: flex-end;
    }
`
