import React from "react";
import { useTransactionFunction } from "./useTransactionFunction";
import { VirtualElement } from '@popperjs/core';
import { Tooltip, TooltipProps } from "@app/components/Tooltip";


type ButtonlikeProps = {
  disabled?: boolean;
  variant?: string;
  onClick?: () => void;
};

export type Hoverable = {
  onMouseOver: () => void;
  onMouseOut: () => void;
  ref: (instance: Element | VirtualElement | null) => void;
};

type TransactionProps<C> = {
  id: string;
  tooltip?: string;
  tooltipPlacement?: TooltipProps<C>["placement"];
  showFailure?: "asTooltip" | "asChildText";
  requires?: readonly (readonly [boolean, string])[];
  send: any/* TransactionFunction */;
  children: C;
};

export function TransactionWrapper<C extends React.ReactElement<ButtonlikeProps & Hoverable>>({
    id,
    tooltip,
    tooltipPlacement,
    showFailure,
    requires,
    send,
    children
  }: TransactionProps<C>) {
    const [sendTransaction, transactionState] = useTransactionFunction(id, send);
    const trigger = React.Children.only<C>(children);
  
    const failureReasons = (requires || [])
      .filter(([requirement]) => !requirement)
      .map(([, reason]) => reason);
  
    if (
      transactionState.type === "waitingForApproval" ||
      transactionState.type === "waitingForConfirmation"
    ) {
      failureReasons.push("You must wait for confirmation");
    }
  
    showFailure =
      failureReasons.length > 0 ? showFailure ?? (tooltip ? "asTooltip" : "asChildText") : undefined;
  
    const clonedTrigger =
      showFailure === "asChildText"
        ? React.cloneElement(
            trigger,
            {
              disabled: true,
              variant: "danger"
            },
            failureReasons[0]
          )
        : showFailure === "asTooltip"
        ? React.cloneElement(trigger, { disabled: true })
        : React.cloneElement(trigger, { onClick: sendTransaction });
  
    if (showFailure === "asTooltip") {
      tooltip = failureReasons[0];
    }
  
    return tooltip ? (
      <>
        <Tooltip message={tooltip} placement={tooltipPlacement || "right"}>
          {clonedTrigger}
        </Tooltip>
      </>
    ) : (
      clonedTrigger
    );
  }