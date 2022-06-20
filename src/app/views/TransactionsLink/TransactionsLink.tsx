import React from "react";
import { Link } from 'react-router-dom';
import { Text, Flex } from "theme-ui";

export const TransactionLink: React.FC = () => {
  return (
    <>
    <Flex>
        <Text sx={{ flex: 2, letterSpacing:'3.1px' }}>MY BANS</Text>
        <Link to='/transactions' style={{ textDecoration: 'none' }}>
        <Text variant='link'>
        See all BANS transactions
          </Text>
        </Link>
    </Flex>

  </>
  )
}