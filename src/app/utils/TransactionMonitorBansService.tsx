import { TransactionContext, useTransactionState } from "@app/library/transaction-react/context/TransactionContext";
import { selectContractHeight } from "@app/store/BansStore/selectors";
import { selectTransactions } from "@app/store/SharedStore/selectors";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type TransactionActionType = string;

export const TransactionMonitorBansService = () => {
    const [transactionState, setTransactionState] = useTransactionState();
    const [processingTransactionIds, setProcessingTransactionIds] = useState([]);

    const transactions = useSelector(selectTransactions());
    const contractHeight = useSelector(selectContractHeight());

    useEffect(() => {
        if(transactionState.type === "waitingForApproval" || transactionState.type === "waitingForConfirmation")
            return;

        for (let transaction of transactions) {
            const isPending = [0, 1, 5].includes(transaction.status);
            const isAlreadyAdded = processingTransactionIds.find(addedTransaction => addedTransaction.txId == transaction.txId);

            if (isPending && !isAlreadyAdded /* && transaction.height <= contractHeight */) {
                setProcessingTransactionIds( 
                    previous => [...previous, {txId: transaction.txId, id: transaction.comment}]
                )

                setTransactionState({type: "pending", id: transaction.comment});
                return;
            }

            if(transaction.status == 3 && isAlreadyAdded) {
                setTransactionState({type: "completed", id: transaction.comment});
                return;
            }
        }
    }, [transactions])


    return <></>;

}   