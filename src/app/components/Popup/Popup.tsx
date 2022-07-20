import React from "react";
import { Container, BluredContainer } from './Popup.styles';

interface PopupProps {
  children: React.ReactElement[] | React.ReactElement;
  isVisible: boolean;
}

export const Popup: React.FC<PopupProps> = ({ children, isVisible }) => {

  return (
    <>
      <Container isVisible={isVisible}>
        { children }
      </Container>
    </>
  )
}