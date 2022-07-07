import React, { useEffect, useState } from "react";
import { Paragraph, Text, Flex, Heading } from "theme-ui";
import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { Amount } from "@app/components/Amount/Amount";
import Button from "@app/components/Button";
import { WithDrawButton } from "@app/components/WithdrawButton/WithDrawButton";
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import { useSelector } from "react-redux";
import { selectPublicKey, selectSystemState } from "@app/store/SharedStore/selectors";
import { DomainPresenterType, getDomainPresentedData } from "@app/library/bans/DomainPresenter";
import _ from "lodash";

interface RightSideProps {
  domain: DomainPresenterType;
}
const RightSide: React.FC<RightSideProps> = ({ domain }) => {
  return (
    <Flex sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
    <Amount value="0" size="14px" />
    <WithDrawButton text='withdraw' />
    {
      domain.isExpired &&  (
        <Button variant="ghostBordered" pallete="green" style={{ margin: '0 0 0 20px' }}>
          renew subscription
        </Button>
      )
    }
    </Flex>
 
  )
}
interface MyBansProps {
}
export const MyBans: React.FC<MyBansProps> = ({}) => {

  const { registeredMethods } = useBansApi();
  const [domains, setDomains] = useState(null);
  const myKey = useSelector(selectPublicKey());

  const publicKey = useSelector(selectPublicKey());
  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp
  } = useSelector(selectSystemState());

  //@TODO: REFACTOR, OPTIMIZE!!!
  useEffect(() => {
    publicKey && registeredMethods.userView().then(response => {
      setDomains(response.domains.map(
        //for future logic
        domain => getDomainPresentedData(
          { ...domain, ...{ searchName: domain.name } },
          currentStateTimestamp,
          currentStateHeight,
          publicKey
        )
      ));
    });

  }, [myKey, currentStateHeight, currentStateTimestamp])

  //const isExpiredText = isExpired ? 'Paid term of usage is over. Your domain will be disconnected on June 30, 2022' : 'Expires on June 29, 2022';

  return (
    <>
      <Paragraph sx={{ mt:'53px', mb:5, letterSpacing:'3.1px', color:'rgba(255, 255, 255, 0.5)' }}>MY BANS</Paragraph>
      {
        _.isArray(domains) && domains.length ? domains.map((domain, i) => (
          <SplitContainer key={i} leftWeight={9} rightWeight={3}>
            <LeftSide domain={domain} />
            <RightSide domain={domain} />
          </SplitContainer>
        )) : <><Heading>Waiting for contract methods</Heading> </>
      }
    </>
  );
}

export default MyBans;