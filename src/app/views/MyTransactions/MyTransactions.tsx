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
import BeamDappConnector from "@core/BeamDappConnector.js";
import SaleIcon from '@app/assets/icons/sell.svg';
import EmptyPage from "../EmptyPage/EmptyPage";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { RenewModal } from "../Modals/RenewModal";
import AssetIcon from "@app/components/AssetSelector/AssetIcon";

interface RightSideProps {
  domain: DomainPresenterType;
  funds: any/* Array<{ amount: number, transferred: any }> */;
  assetLabels: Map<number, string>;
}

const RightSide: React.FC<RightSideProps> = ({ domain, funds, assetLabels }) => {
  
  //@TODO:temp solution
  //const TRANSACTION_ID = `WITHDRAW FROM ${domain.name.toUpperCase()}.beam`
  const TRANSACTION_ID = "WITHDRAW ALL";
  
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });
  const { open } = useModalContext();

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      return () => {
        store.dispatch(reloadAllUserInfo.request());
      }
    }

  }, [transactionState]);

  const byAsset = funds.byAsset as Record<number, number> | undefined;
  const hasByAsset = byAsset && Object.keys(byAsset).length > 0;
  const assetEntries = hasByAsset ? Object.entries(byAsset).filter(([, amt]) => amt > 0) : [];
  const amount = BeamDappConnector.grothToBeam(byAsset?.[0] ?? funds.amount ?? 0);

  /** One receive_list slot per vault output; shader expects key_N + aid_N (not only key_N → defaults to BEAM). */
  const receiveListEntries = funds?.transferred?.length
    ? (funds.transferred as Array<{ amount?: number; aid?: number; pk?: string }>)
        .filter((t) => (t.amount ?? 0) > 0 && t.pk)
        .map((t) => ({ pk: t.pk as string, aid: t.aid ?? 0 }))
    : [];

  return (
    <Flex sx={{ justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      {hasByAsset && assetEntries.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            justifyItems: 'start',
            columnGap: '8px',
            rowGap: '4px',
            alignItems: 'center',
            width: 'max-content',
            maxWidth: '100%',
            minWidth: 0,
            '& .my-bans-asset-icon': { marginRight: 0 },
          }}
        >
          {assetEntries.map(([aidStr, amt]) => {
            const aid = parseInt(aidStr, 10);
            const label = aid === 0 ? 'BEAM' : (assetLabels.get(aid) || `Asset ${aid}`);
            return (
              <React.Fragment key={aid}>
                <AssetIcon asset_id={aid} className="my-bans-asset-icon" />
                <Text sx={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', minWidth: 0 }}>{label}:</Text>
                <Text
                  sx={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                    justifySelf: 'end',
                  }}
                >
                  {BeamDappConnector.grothToBeam(amt)}
                </Text>
              </React.Fragment>
            );
          })}
        </Box>
      ) : (
        <Amount value={amount} size="14px" />
      )}

      <Box sx={{ mb: '6px' }}>
        {funds?.transferred?.length ? (
          
            <WithdrawAction
              transactionId={TRANSACTION_ID}
              change={"withdrawFromDomain"}
              domain={domain}
              receiveListEntries={receiveListEntries}
              disabled={isTransactionPending}
            >
              <WithDrawButton text='withdraw' />
            </WithdrawAction>

        ) : <></>}
      </Box>
      {
        domain.isInGracePeriod && (
          <Button
            variant="ghostBordered"
            pallete="green"
            style={{ margin: '0 0 0 20px' }}
            onClick={(event) => open(event)("modal-renew")({ domain: domain, })(null)}
          >
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
          {domain.expiresAt ? <SubText isexpired={domain.isExpired ? domain.isExpired.toString() : ""}>{
            !domain.isExpired ?
              `Expires on ${domain.expiresAt}` :
              domain.isInGracePeriod ?
                `Paid term of usage is over. Your domain will be disconnected on ${domain.gracePeriod}` :
                `Paid term and grace period have ended.`
          }</SubText> : <></>}
        </Flex>
      </Box>
    </Flex>
  )

}

interface MyBansProps {
  assetLabels: Map<number, string>;
}

export const MyTransactions: React.FC<MyBansProps> = ({ assetLabels }) => {

  const [fundDomains, setFundsDomains] = useState<Map<DomainPresenterType, object>>(null);
  //const [rows, setRows] = useState(null);

  const domains = useSelector(selectUserDomains);
  const funds = useSelector(selectUserFunds);


  useEffect(() => {
    const fundsMap = new Map();

    domains.forEach(
      domain => {
        const matchDomain = (t: { domain: string }) => t.domain === domain.name;
        const fromTransferred = funds?.transferred?.length
          ? funds.transferred.filter(matchDomain)
          : [];
        /** Same merge as setUserFundsSaga: raw (revenue) + anon (transferred), else MY BANS withdraw misses sale proceeds. */
        const fromRevenue = funds?.revenue?.length
          ? funds.revenue.filter(matchDomain)
          : [];
        const transferred = [...fromTransferred, ...fromRevenue];

        const byAsset: Record<number, number> = {};
        let amount = 0;
        if (transferred.length) {
          transferred.forEach((fund: { amount: number; aid?: number }) => {
            const aid = fund.aid ?? 0;
            byAsset[aid] = (byAsset[aid] || 0) + (fund.amount || 0);
            amount += fund.amount || 0;
          });
        }

        fundsMap.set(
          domain, {
          amount,
          byAsset: Object.keys(byAsset).length ? byAsset : undefined,
          transferred
        }
        );
      }
    );

    const sortedFundsMap = new Map([...fundsMap.entries()]
      .sort((a, b) => (a[1] as { amount: number }).amount < (b[1] as { amount: number }).amount ? 1 : -1)
    );

    setFundsDomains(sortedFundsMap);
  }, [domains, funds])


  const rows = useMemo(() => {
    if (!_.isMap(fundDomains) || !fundDomains.size) return <></>;

    let rows = [];

    for (const [domain, funds] of fundDomains) {
      rows.push(
        <SplitContainer key={domain.name} leftWeight={6} rightWeight={6}>
          <LeftSide domain={domain} />
          <RightSide domain={domain} funds={funds} assetLabels={assetLabels} />
        </SplitContainer>
      )
    }

    return rows;

  }, [fundDomains, assetLabels])

  //const isExpiredText = isExpired ? 'Paid term of usage is over. Your domain will be disconnected on June 30, 2022' : 'Expires on June 29, 2022';

  return (
    <>
      <Paragraph sx={{ fontFamily: 'SFProDisplay', mt: '53px', mb: 5, letterSpacing: '3.1px', color: 'rgba(255, 255, 255, 0.5)' }}>MY BANS</Paragraph>
      {rows.length ? rows : <EmptyPage emptyText={"You do not hold any domains"} />}
      <ModalManager />
    </>
  );
}

const ModalManager: React.FC = () => {
  const { current, close } = useModalContext();

  return (
    <>
      <RenewModal isShown={current == "modal-renew"} />
    </>
  );
};

export default MyTransactions;