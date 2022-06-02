import { useCurrentTransactionState } from "./useCurrentTransactionState"

const state = ({ transactionIdPrefix }) => {
    const transactionIdMatcher = new RegExp(`^${transactionIdPrefix}`);
    return useCurrentTransactionState(transactionIdMatcher);
}

export const IsTransactionPending = ({ transactionIdPrefix }) => !!["pending", "in progress", "registering", "waitingForApproval", "waitingForConfirmation"].includes(
    state({transactionIdPrefix}).type
);

export const IsTransactionFailed = ({ transactionIdPrefix }) => !!["failed", "cancelled"].includes(
    state({transactionIdPrefix}).type
);

export const IsTransactionSuccess = ({ transactionIdPrefix }) => !!["completed"].includes(
    state({transactionIdPrefix}).type
);


export const IsTransactionStatus = ({ transactionIdPrefix }) => [
    IsTransactionPending({transactionIdPrefix}),
    IsTransactionFailed({transactionIdPrefix}),
    IsTransactionSuccess({transactionIdPrefix})
]
