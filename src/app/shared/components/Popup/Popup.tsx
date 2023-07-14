import React from 'react';
import Utils from '@core/utils.js';
import { styled } from '@linaria/react';

export interface PopupProps {
  children: React.ReactElement[] | React.ReactElement;
  isVisible: boolean;
  bgColor?: string
}
const Container = styled.div<PopupProps>`
  border-radius: 10px;
  z-index:  999;
  position: absolute;
  outline:  none;
  padding:  20px;
  background-color: ${({ bgColor }) => (bgColor || '#000')};
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  right: 10px;
`;
const Popup: React.FC<PopupProps> = ({ isVisible, children }) => (
  <Container isVisible={isVisible} bgColor={Utils.getStyles().background_main}>
    { children }
  </Container>
);
export default Popup;
