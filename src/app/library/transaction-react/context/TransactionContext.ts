import { createContext, useContext } from 'react';
import { TransactionState } from '../types';

export const TransactionContext = createContext<
  [TransactionState, (state: TransactionState) => void] | undefined
>(null);

export const useTransactionState = () => {
  const transactionState = useContext(TransactionContext);

  if (!transactionState) {
    throw new Error(
      'You must provide a TransactionContext via TransactionProvider',
    );
  }

  return transactionState;
};
