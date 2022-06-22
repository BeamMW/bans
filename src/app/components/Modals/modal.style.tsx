import styled from 'styled-components';
import utils from '../../core/utils';

const bgColor = "#0e4d76"; //utils.getStyles().background_popup;
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: var(--color-dark-transparent);
`;

export const ModalContent = styled.div`
    padding: 40px;
    border-radius: 10px;
    background-color: ${bgColor};
`;