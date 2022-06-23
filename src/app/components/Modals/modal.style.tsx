import styled from 'styled-components';
import utils from '../../core/utils';

const bgColor = utils.getStyles().background_popup;
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
    /* background-color: ${bgColor}; */
    background-color: #0D4D76;
`;

export const ModalHeader = styled.p`
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #FFFFFF;
    text-align: center;
    margin: 40px 0px 30px 0px;
`