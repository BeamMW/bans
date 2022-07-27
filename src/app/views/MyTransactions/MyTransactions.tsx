import React, { useEffect, useMemo, useState } from "react";
import { Paragraph, Text, Flex, Heading, Box } from "theme-ui";
import { useSelector } from "react-redux";
import _ from "lodash";
import store from "index";
import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { SubText } from "@app/components/LeftSideInfo/LeftSideInfo";
import { Amount } from "@app/components/Amount/Amount";
import Button from "@app/components/Button";
import { WithDrawButton } from "@app/components/WithdrawButton/WithDrawButton";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { selectUserDomains, selectUserFunds } from "@app/store/BansStore/selectors";
import { WithdrawAction } from "../Actions/WithdrawAction";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import SaleIcon from '@app/assets/icons/sell.svg';
import EmptyPage from "../EmptyPage/EmptyPage";

interface RightSideProps {
  domain: DomainPresenterType;
  funds: any/* Array<{ amount: number, transferred: any }> */;
}

const RightSide: React.FC<RightSideProps> = ({ domain, funds }) => {
  const TRANSACTION_ID = `WITHDRAW FROM ${domain.name.toUpperCase()}.beam`

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      return () => {
        store.dispatch(reloadAllUserInfo.request());
      }
    }

  }, [transactionState]);

  const amount = Decimal.from(
    funds.amount
  ).div(GROTHS_IN_BEAM).toString();

  const pkKeys = funds?.transferred.length && funds.transferred.map(transferred => transferred.pk);

  return (
    <Flex sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
      <Amount value={amount} size="14px" />

      <Box sx={{ mb:2 }}>
        {funds.transferred.length ? (
          isTransactionPending ? <LoadingOverlay /> :
            <WithdrawAction
              transactionId={TRANSACTION_ID}
              change={"withdrawFromDomain"}
              domain={domain}
              pkKeys={pkKeys}
            >
              <WithDrawButton text='withdraw' />
            </WithdrawAction>

        ) : <></>}
      </Box>
      {
        false && (
          <Button variant="ghostBordered"  pallete="green" style={{ margin: '0 0 0 20px' }}>
            renew subscription
          </Button>
        )
      }
    </Flex>

  )
}

interface LeftSideProps {
  domain: DomainPresenterType;
}

const LeftSide: React.FC<LeftSideProps> = ({ domain }) => {

  return (
    <Flex sx={{ variant: 'layout.card', flexDirection: 'row' }}>


      {domain.isOnSale ?
        <Flex sx={{ marginRight: '20px', alignItems: 'center' }}>
          <SaleIcon />
        </Flex> : <></>
      }

      <Box>
        <Text>{domain.name}.beam</Text>

        <Flex>
          {domain.expiresAt ? <SubText isexpired={domain.isExpired.toString()}>Expires on {domain.expiresAt}</SubText> : <></>}
        </Flex>
      </Box>
    </Flex>
  )

}

interface MyBansProps {
}

export const MyTransactions: React.FC<MyBansProps> = ({ }) => {

  const [fundDomains, setFundsDomains] = useState<Map<DomainPresenterType, object>>(null);
  //const [rows, setRows] = useState(null);

  const domains = useSelector(selectUserDomains());
  const funds = useSelector(selectUserFunds());


  useEffect(() => {
    //try {
    const fundsMap = new Map();

    domains.forEach(
      domain => {
        const transferred = funds?.transferred.length && funds.transferred.filter(
          transferred => transferred.domain === domain.name
        );

        fundsMap.set(
          domain, {
          amount: transferred ? _.reduce(transferred, (acc, fund) => {
            return Decimal.from(fund.amount).add(acc)
          }, 0) : 0,
          transferred: transferred
        }
        )
      }
    );

    const sortedFundsMap = new Map([...fundsMap.entries()]
      .sort((a, b) => a[1].amount < b[1].amount ? 1 : -1)
    )

    setFundsDomains(sortedFundsMap);
    //} catch (e) {
    //  throw new Error("something with domain/funds");
    //}

  }, [domains, funds])


  const rows = useMemo(() => {
    if (!_.isMap(fundDomains) || !fundDomains.size) return <></>;

    let rows = [];

    for (const [domain, funds] of fundDomains) {
      rows.push(
        <SplitContainer key={domain.name} leftWeight={6} rightWeight={6}>
          <LeftSide domain={domain} />
          <RightSide domain={domain} funds={funds} />
        </SplitContainer>
      )
    }

    return rows;

  }, [fundDomains])

  //const isExpiredText = isExpired ? 'Paid term of usage is over. Your domain will be disconnected on June 30, 2022' : 'Expires on June 29, 2022';

  return (
    <>
      <Paragraph sx={{ fontFamily: 'SFProDisplay',mt: '53px', mb: 5, letterSpacing: '3.1px', color: 'rgba(255, 255, 255, 0.5)' }}>MY BANS</Paragraph>
      {rows.length ? rows : <EmptyPage emptyText={"You do not hold any domains"} />}
    </>
  );
}

export default MyTransactions;