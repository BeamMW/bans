import React, {useState} from 'react';
import { TransactionState } from '../types';
import { TransactionContext } from './TransactionContext';

export const TransactionProvider/* : React.FC */ = ({ children }) => {
    const transactionState = useState<TransactionState>({ type: 'idle' });
    
    return (
        <TransactionContext.Provider value={transactionState}>{children}</TransactionContext.Provider>
    );
};
  