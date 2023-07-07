import React from 'react';

export interface ModalProps {
  isShowing: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
