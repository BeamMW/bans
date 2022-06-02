import { useTransactionState } from "./context/TransactionContext";
import { TransactionState } from "./types";

export const useCurrentTransactionState = (myId: string | RegExp): TransactionState => {
    const [transactionState] = useTransactionState();

    return transactionState.type !== "idle" &&
      (typeof myId === "string" ? transactionState.id === myId : transactionState.id.match(myId))
      ? transactionState
      : { type: "idle" };
  };