import React from "react";
import { Container } from './Popup.styles';

interface PopupProps {
  children: React.ReactElement[];
  isVisible: boolean;
}

// TODO: close popup when clicking outside of it

// function useOutsideAlerter(ref: HTMLDivElement) {
//   React.useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event: MouseEvent) {
//       const { current } = wrapperRef;
//       if (current && !current.contains(event.target)) {
//         console.log('fasle')
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);
// }

export const Popup: React.FC<PopupProps> = ({ children, isVisible }) => {
//   const wrapperRef = React.useRef<HTMLDivElement>(null);
//   useOutsideAlerter(wrapperRef);

  return (
    <Container isVisible={isVisible}>
    { children }
  </Container>
  )
}