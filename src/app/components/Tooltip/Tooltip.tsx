import React, { useState } from "react";
import { Card } from "theme-ui";
import "./Tooltip.css";

export enum DIRECTIONS {
  TOP = 'top',
  RIGHT ='right',
  BOTTOM ='bottom',
  LEFT = 'left'
}
interface TooltipProps {
  direction?: DIRECTIONS,
  content: string
  delay?: number,
  customClass?: string
}
export const Tooltip: React.FC<TooltipProps> = (props) => {
  let timeout: ReturnType<typeof setTimeout>;

  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction + ' ' + props.customClass || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};
