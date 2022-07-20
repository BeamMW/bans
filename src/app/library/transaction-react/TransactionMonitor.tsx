import React, { useEffect } from "react";
import { useTransactionState } from "./context/TransactionContext";
import { Flex, Box, Text } from 'theme-ui';
import { TransactionProgressDonut } from './TransactionProgressDonut';

export const TransactionMonitor: React.FC<{ transactions: any, showStatusBlock: boolean }> = ({ transactions, showStatusBlock = false }) => {
  //const { provider } = useLiquity();
  const [transactionState, setTransactionState] = useTransactionState();

  transactions = transactions || [transactionState]


  const id = transactionState.type !== "idle" ? transactionState.id : undefined;
  const tx = transactionState.type === "waitingForConfirmation" ? transactionState.tx : undefined;

  useEffect(() => {
    if (id && tx) {
      let cancelled = false;
      let finished = false;

      //const txHash = tx.rawSentTransaction.hash;

      const waitForConfirmation = async () => {
        try {
          const receipt = await tx/* .waitForReceipt */();
          const txHash = receipt.txId;

          if (cancelled) {
            return;
          }

          const confirmations = receipt.confirmations;
          const blockNumber = receipt.height && confirmations ? receipt.height + confirmations - 1 : ":(";

          console.log(`Block #${blockNumber} ${confirmations ?? ";("}-confirms tx ${txHash}`);
          console.log(`Finish monitoring tx ${txHash}`);

          finished = true;

          if (receipt.status_string === "completed") {
            console.log(receipt);

            setTransactionState({
              type: "completed",
              id
            });

            console.log("complete test log!");
          } else {
            //const reason = await tryToGetRevertReason(provider, receipt.rawReceipt);

            if (cancelled) {
              return;
            }

            console.error(`Tx  failed`,);

            /* if (reason) {
              console.error(`Revert reason: ${reason}`);
            } */

            setTransactionState({
              type: "failed",
              id,
              error: new Error(/* reason ? `Reverted: ${reason}` :  */"Failed")
            });
          }
        } catch (rawError) {
          if (cancelled) {
            return;
          }

          finished = true;

          /*  if (rawError instanceof EthersTransactionCancelledError) {
             console.log(`Cancelled tx ${txHash}`);
             setTransactionState({ type: "cancelled", id });
           } else { */
          console.error(`Failed to get receipt for tx ` /* ${txHash} */);
          console.error(rawError);

          setTransactionState({
            type: "failed",
            id,
            error: new Error("Failed")
          });
          /* } */
        }
      };

      //console.log(`Start monitoring tx ${txHash}`);
      waitForConfirmation();

      return () => {
        if (!finished) {
          setTransactionState({ type: "idle" });
          //console.log(`Cancel monitoring tx ${txHash}`);
          cancelled = true;
        }
      };
    }
  }, [/* provider, */ id, tx, setTransactionState]);

  useEffect(() => {
    if (
      transactionState.type === "completed" ||
      transactionState.type === "failed" ||
      transactionState.type === "cancelled"
    ) {
      let cancelled = false;

      setTimeout(() => {
        if (!cancelled) {
          setTransactionState({ type: "idle" });
        }
      }, 5000);

      return () => {
        cancelled = true;
      };
    }
  }, [transactionState.type, setTransactionState, id]);

  if (transactionState.type === "idle" || transactionState.type === "waitingForApproval") {
    return null;
  }

  if (showStatusBlock)
    return (
      <Flex
        sx={{
          alignItems: "center",
          bg:
            transactionState.type === "completed"
              ? "success"
              : transactionState.type === "cancelled"
                ? "warning"
                : transactionState.type === "failed"
                  ? "danger"
                  : "primary",
          p: 3,
          pl: 4,
          position: "fixed",
          width: "100vw",
          bottom: 0,
          overflow: "hidden"
        }}
      >
        <Box sx={{ mr: 3, width: "40px", height: "40px" }}>
          <TransactionProgressDonut state={transactionState.type} />
        </Box>

        <Text sx={{ fontSize: 3, color: "white", bg: "transaction" }}>
          {["waitingForConfirmation", "pending", "registering"].includes(transactionState.type)
            ? `Waiting for confirmation (${transactionState.id})`
            : transactionState.type === "cancelled"
              ? `Cancelled  (${transactionState.id})`
              : transactionState.type === "failed"
                ? transactionState.error.message
                : `Confirmed  (${transactionState.id})`}
        </Text>
      </Flex>
    );

  return <></>;

};
