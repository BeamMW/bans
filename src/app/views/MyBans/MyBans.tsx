import React from "react";
import { Paragraph, Text, Flex } from "theme-ui";
import { SplitContainer } from "@app/components/SplitContainer/SplitContainer";
import { LeftSide } from "@app/components/LeftSideInfo/LeftSideInfo";
import { Amount } from "@app/components/Amount/Amount";
import Button from "@app/components/Button";
import { WithDrawButton } from "@app/components/WithdrawButton/WithDrawButton";

interface RightSideProps {
  isExpired: boolean;
}
const RightSide: React.FC<RightSideProps> = ({ isExpired }) => {
  return (
    <Flex sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
    <Amount value="200" size="14px" />
    <WithDrawButton text='withdraw' />
    {
      isExpired &&  (
        <Button variant="ghostBordered" pallete="green" style={{ margin: '0 0 0 20px' }}>
          renew subscription
        </Button>
      )
    }
    </Flex>
 
  )
}
interface MyBansProps {
  isExpired: boolean
}
export const MyBans: React.FC<MyBansProps> = ({isExpired}) => {
  const isExpiredText = isExpired ? 'Paid term of usage is over. Your domain will be disconnected on June 30, 2022' : 'Expires on June 29, 2022';
  return (
    <>
      <Paragraph sx={{ mt:'53px', mb:5, letterSpacing:'3.1px', color:'rgba(255, 255, 255, 0.5)' }}>MY BANS</Paragraph>
      <SplitContainer leftWeight={1} rightWeight={4}>
        <LeftSide name='testName.beam' expiresAt={isExpiredText} isExpired={isExpired}/>
        <RightSide isExpired={isExpired}/>
      </SplitContainer>
    </>
  );
}

export default MyBans;