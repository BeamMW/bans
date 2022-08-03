import React, { useState } from 'react';
import { TransactionState } from '../types';
import { TransactionContext } from './TransactionContext';
import { Dictionary } from 'typescript-collections';

export type TransactionsQueue = Dictionary<string, TransactionState>;

//const funcDictionaryStringConverter = (string, transaction: object) => JSON.stringify(transaction);

const addToSet = (transaction) => {
    const dictionary = new Dictionary<string, TransactionState>();
    dictionary.setValue(transaction.id, transaction);
    return dictionary;
}

export const TransactionProvider: React.FC = ({ children }) => {
    const [transactionsState, _setTransactionsState] = useState<TransactionsQueue>(null);

    const setTransactionState = (transactionState: TransactionState) => {
        const transactionUiId = transactionState.id;
        
        if (!transactionsState || transactionsState.isEmpty()) {
            return transactionsState.setValue(
                transactionUiId, transactionState
            );
        }

        if (transactionsState.contains(transactionState)) {

        }
            const unionSet = new Set(funcSetStringConverter);

        return transactionsState.contains(transactionState, () => transactionState.id)

        transactionsState.push() : [transactionsState];
    }

    return (
        <TransactionContext.Provider value={[transactionsState, setTransactionState]}>{children}</TransactionContext.Provider>
    );
};
