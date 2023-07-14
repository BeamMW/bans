import { styled } from '@linaria/react';

export const Label = styled.div`
    display: block;
    margin-bottom:10px;
    color: rgba(255,255,255,0.6);
    font-family: 'SFProDisplay', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    
    &.error {
      color: rgba(255, 98, 92, 0.7);
    }
`;

export const CustomSelect = styled.div`
  position: relative;
  display: flex;
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;

  .selected {
    color: #fff;
    width: 100%;
    user-select: none;
    font-size: 14px;
    font-weight: normal;
    padding: 15px 20px;

    &.open {
      border: none;
      border-radius: 10px;
    }

    &.focus {
      background-color: rgba(255, 255, 255, 0.12);
    }
  }

  .arrow {
    width: 9px;
    height: 5px;
    position: absolute;
    right: 20px;
    top:50%;
  }

  .items {
    background-color: #003F67;
    color: #fff;
    position: absolute;
    border:none;
    border-radius: 4px;
    font-size: 14px;
    right: 0;
    z-index: 1;
    margin-top: 47px;
    width: 100%;
    max-height: 250px;
    overflow-y: scroll;

    div {
      color: #fff;
      padding: 15px 0px 15px 15px;
      white-space: nowrap;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      
      &:hover {
        color: #00f6d2;
      }
    }

    .highlight {
      font-weight: bold;
      color: #00f6d2;
    }
  }
`;
