import styled from 'styled-components';

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  font-size: 14px;
  line-height: 1;
  outline: none;
  user-select: none;

  &:hover {
    opacity: 0.9;
  }

  .trigger-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trigger-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 2px;

    svg {
      display: block;
      width: 8px;
      height: auto;
    }
  }
`;

export const DropdownWrap = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  z-index: 100;
  min-width: 140px;
  max-width: 200px;
  background: rgba(0, 63, 103, 0.98);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  font-size: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const List = styled.div`
  max-height: 180px;
  overflow-y: auto;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #00f6d2;
  }

  .option-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const EmptyMsg = styled.div`
  padding: 10px 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
`;
