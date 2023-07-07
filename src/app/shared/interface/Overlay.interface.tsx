import React from "react";

export interface OverlayProps {
  body?: React.ReactNode | string;
  show?: boolean;
  leaveConfirm?: boolean;
  leaveText?: string;
  onLeave?: () => void;
}
