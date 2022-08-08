import React, { useEffect, useRef, useState } from "react";
import { useTransactionState } from "./context/TransactionContext";
import { Flex, Box, Text } from 'theme-ui';
import { TransactionProgressDonut } from './TransactionProgressDonut';
import { TransactionState } from "./types";

export const TransactionMonitor/* : React.FC<{ shaderTransactions: any, showStatusBlock: boolean }> */ = ({ shaderTransactions, showStatusBlock = false }) => {
  const { transactionsState, setTransactionState } = useTransactionState();
  const [areTransactionsToShow, setAreTransactionsToShow] = useState<boolean>(false);

  useEffect(() => {

    transactionsState.forEach((transactionUiId: string, transactionState) => {

      const id = transactionState.type !== "idle" ? transactionUiId : null;
      const tx = transactionState.type === "waitingForConfirmation" ? transactionState.tx : null;

      if (id && tx) {

        const waitForConfirmation = async () => {

          //console.log(`%c waitForConfirmation calling for id:${id} and  transaction current status: ${transactionState.type}`, 'background: #222; color: #bada55');

          //set transaction pending status
          setTransactionState({
            type: "pending",
            id
          });

          let cancelled = false;
          let finished = false;

          try {
            const receipt = await tx();
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

            //console.log(`%c waitForConfirmation complete with id:${id}`, 'background: #222; color: #185fbe');
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

          if (!finished) {
            console.log("finish manually for id:" + id);
            setTransactionState({ type: "idle", id: id });
            cancelled = true;
          }

        };

        //console.log(`Start monitoring tx ${txHash}`);
        waitForConfirmation();
      }

    });
  }, [transactionsState]);

  useEffect(() => {
    let cancelled = false;

    transactionsState.forEach((transactionUiId: string, transactionState: TransactionState) => {
      if (
        transactionState.type === "completed" ||
        transactionState.type === "failed" ||
        transactionState.type === "cancelled"
      ) {

        setTimeout(() => {
          if (!cancelled) {
            //console.log(`%c setTransactionState with id: ${transactionUiId} to idle`, 'background: #222; color: red');
            setTransactionState({ type: "idle", id: transactionUiId });
          }
        }, 1000);

      }
    });

    return () => {
      cancelled = true;
    };

  }, [JSON.stringify(transactionsState)]);

  useEffect(() => {
    transactionsState.values().map((transactionState) => {
      if (transactionState.type !== "idle" && transactionState.type !== "waitingForApproval") {
        setAreTransactionsToShow(true);
        return;
      }
    });

    return () => {
      setAreTransactionsToShow(false);
    }
  }, [JSON.stringify(transactionsState)]);

  if (showStatusBlock && areTransactionsToShow) {
    const transactions: Array<TransactionState> = transactionsState.values().filter(
      transaction => !["waitingForApproval", "idle"].includes(transaction.type)
    );

    return (
      <Flex
        sx={{
          flexDirection: "column",
          position: "fixed",
          width: "350px",
          bottom: 0,
          left: 0,
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {
          transactions.length ? transactions.map((transactionState) => {
            return (
              <>
                <React.Fragment key={transactionState.id}>
                  <Flex
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#110c54",
                      borderRadius: "10px",
                      opacity: 0.8,
                      bg:
                        ["cancelled", "failed"].includes(transactionState.type)
                          ? "danger"
                          : "transactionBg",
                      my: 1,
                      mx: 1,
                      p: 3,
                      pl: 4,
                    }}
                  >
                    {
                      !["failed", "cancelled"].includes(transactionState.type) ? <Box sx={{ mr: 3, width: "28px", height: "28px" }}>
                        <TransactionProgressDonut state={transactionState.type} />
                      </Box> : <></>
                    }


                    <Flex sx={{ flexDirection: "column" }}>
                      <Text sx={{ fontSize: 0, color: "white", bg: "transaction", mb: "1" }}>
                        {["waitingForConfirmation", "pending", "registering"].includes(transactionState.type)
                          ? "Waiting for confirmation"
                          : transactionState.type === "cancelled"
                            ? "Cancelled"
                            : transactionState.type === "failed"
                              ? "Failed"
                              : "Confirmed"}
                      </Text>

                      <Text sx={{ fontSize: 0, color: "white", bg: "transaction" }}>
                        {transactionState.type === "failed" ? transactionState.error.message : `${transactionState.id}`}
                      </Text>
                    </Flex>

                  </Flex>
                </React.Fragment>
              </>
            );
          }) : <></>}
      </Flex>
    );
  }

  return <></>;

};
