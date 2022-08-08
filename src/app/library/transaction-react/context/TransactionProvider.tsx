import React, { useCallback, useReducer, useRef, useState } from 'react';
import { TransactionState } from '../types';
import { TransactionContext } from './TransactionContext';
import { Dictionary } from 'typescript-collections';

export type TransactionsBatch = Dictionary<string, TransactionState>;

//const funcDictionaryStringConverter = (string, transaction: object) => JSON.stringify(transaction);

export const TransactionProvider/* : React.FC */ = ({ children }) => {
    const transactionsState = useRef<TransactionsBatch>(new Dictionary(/* funcDictionaryStringConverter */));
    const [, rerender] = useReducer(p => !p, false);

    //const [transactionsState, _setTransactionsState] = useState<TransactionsBatch>(
    //    new Dictionary(/* funcDictionaryStringConverter */)
    //);

    /* We have to create copy of dictionary due to useEffect does not effect initial useState value changes */
    const deepCopyDictionary = (fromDictionary: TransactionsBatch, newDictionaryInitializer: Function = null): TransactionsBatch => {

        const newDictionary = !!newDictionaryInitializer && typeof newDictionaryInitializer === "function" ?
            newDictionaryInitializer(/* maybe implement some params */) :
            new Dictionary();

        fromDictionary.forEach((key, value) => {
            newDictionary.setValue(key, value);
        });


        return newDictionary;
    }

    const setTransactionState = (transactionState: TransactionState) => {
        const transactionUiId = transactionState.id;
        //console.log("setTransactionState income params", transactionUiId, transactionState);
        //console.log("and transactionsState has", transactionsState.current.values());

        /**
         * @TODO: Optimiziation issues due to every context render we re-create new dictionary copy
         */
        const copiedDictionary: TransactionsBatch = deepCopyDictionary(transactionsState.current);

        /**
         * In current logic we delete idle transaction.
         * @@TODO: create removeTransactionState instead of idle type implicit logic
         */
        if (
            transactionState.type === "idle"
            /* transactionState.type === "completed" ||
            transactionState.type === "failed" ||
            transactionState.type === "cancelled" */
        ) copiedDictionary.remove(transactionUiId);
        else copiedDictionary.setValue(transactionUiId, transactionState);

        transactionsState.current = copiedDictionary;

        //rerender for useEffect in TransactionMonitor
        rerender();


        //_setTransactionsState(copiedDictionary);
        //console.log("TransactionProvider seted transactionsState", copiedDictionary.keys(), copiedDictionary.values());

    }

    return (
        <TransactionContext.Provider value={{ transactionsState: transactionsState.current, setTransactionState }}>{children}</TransactionContext.Provider>
    );
};
