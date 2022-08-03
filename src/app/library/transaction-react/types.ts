/* type SentTransaction = SentLiquityTransaction<
  TransactionResponse,
  LiquityReceipt<TransactionReceipt>
>; */

type TransactionIdle = {
  type: 'idle';
};

type TransactionPending = {
  type: 'pending';
  id: string;
};

type TransactionRegistering = {
  type: 'registering';
  id: string;
};

type TransactionFailed = {
  type: 'failed';
  id: string;
  error: Error;
};

type TransactionWaitingForApproval = {
  type: 'waitingForApproval';
  id: string;
};

type TransactionCancelled = {
  type: 'cancelled';
  id: string;
};

type TransactionWaitingForConfirmations = {
  type: 'waitingForConfirmation';
  id: string;
  tx: any /* SentTransaction */;
};

type TransactionCompleted = {
  type: 'completed';
  id: string;
};

export type TransactionState = TransactionIdle
    | TransactionPending
    | TransactionRegistering
    | TransactionFailed
    | TransactionWaitingForApproval
    | TransactionCancelled
    | TransactionWaitingForConfirmations
    | TransactionCompleted;

export type TransactionFunction = (
  overrides?/* : EthersTransactionOverrides */,
) => Promise<any/* SentTransaction */>;


export type TransactionProgressDonutProps = any;