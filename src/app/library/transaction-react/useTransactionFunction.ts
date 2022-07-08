import { useCallback } from "react";
import { useTransactionState } from "./context/TransactionContext";
import { TransactionState } from "./types";
import { Transaction } from '@core/types';


export const useTransactionFunction = (
    id: string,
    send/* : TransactionFunction */
  ): [sendTransaction: () => Promise<void>, transactionState: TransactionState] => {
    const [transactionState, setTransactionState] = useTransactionState();
  
    const sendTransaction = useCallback(async () => {
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
  
    return [sendTransaction, transactionState];
  };