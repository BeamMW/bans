import { useCallback } from "react";
import { useTransactionState } from "./context/TransactionContext";
import { TransactionState } from "./types";
import { Transaction } from '@app/library/base/transaction/types';
import { TransactionsBatch } from "./context/TransactionProvider";
import { delay } from "../base/appUtils";


export const useTransactionFunction = (
    id: string,
    send/* : TransactionFunction */
  ): [sendTransaction: () => Promise<void>] => {
    const {transactionsState,setTransactionState} = useTransactionState();
  
    const sendTransaction = useCallback(async () => {
      console.log(`%c calling useTransactionFunction with id:${id}`, "background: #222; color: pink");
      setTransactionState({ type: "waitingForApproval", id });
  
      try {
        /**
         * Send direct api transaction call
         */
        const tx/* : return promise function */ = await send();

        setTransactionState({
          type: "waitingForConfirmation",
          id,
          tx
        });

      } catch (error) {
        /* if (hasMessage(error) && error.message.includes("User denied transaction signature")) {
          setTransactionState({ type: "cancelled", id });
        } else { */

          console.log("useTransactionFunction", error.message, error);
  
          setTransactionState({
            type: "failed",
            id,
            error: new Error(`Failed to send transaction (${error.message ?? 'try again'})`)
          });
        /* } */
      }
    }, [send, id, setTransactionState]);
  
    return [sendTransaction];
  };