import React, { useState, useRef } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";
import { VirtualElement } from "@popperjs/core";

const PopperContainer = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background: rgba(255,255,255,0.15);
  text-align: center;
  backdrop-filter: blur(10px);
  color: #fff;
  border-radius: 6px;
  padding: 11px 11px;
  font-family: 'SFProDisplay', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  margin-bottom: 4px;

  /* .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: " ";
      position: absolute;
      top: -12px; // we account for the PopperContainer padding
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background: var(--color-pallete);
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    } 
  } 
  &[data-popper-placement^="top"] > .arrow {
    bottom: -38px;
    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  } */
`;

export type Hoverable = {
  onMouseOver: () => void;
  onMouseOut: () => void;
  ref: (instance: Element | VirtualElement | null) => void;
};

export type TooltipProps<C> = {
  children: C;
  message: string;
  placement?: "top" | "bottom" | "left" | "right";
};

export function Tooltip<C extends React.ReactElement<Hoverable>>({
  children,
  message,
  placement = "top"
}: TooltipProps<C>) {
  const event = useRef<"over" | "out">();
  const [show, setShow] = useState(false);
  const [referenceElement, setReferenceElement] = useState<Element | VirtualElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowRef, setArrowRed] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement, popperElement, 
    {
      placement,
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef
          }
        },
        {
          name: "offset",
          options: {
            offset: [0, 10]
          }
        }
      ]
    }
  );

  return (
    <>
    {React.cloneElement(React.Children.only<C>(children), {

      onMouseOver: () => {
        event.current = "over";

        if (!show) {
          setShow(true);
        }
      },

      onMouseOut: () => {
        event.current = "out";

        setTimeout(() => {
          if (event.current === "out") {
            setShow(false);
          }
        }, 0);
      },

      ref: setReferenceElement
    })}

{show && (
     <PopperContainer
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      <div ref={setArrowRed} style={styles.arrow} className="arrow" />
      {message}
    </PopperContainer>
)}
    </>
  );
};

export default Tooltip;
