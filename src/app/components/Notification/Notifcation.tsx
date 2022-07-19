import { RemoveIcon } from "@app/assets/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text } from "theme-ui";
import { SplitContainer } from "../SplitContainer/SplitContainer";


export const Notification = ({text, handler, closeHandler, passKey}) => {
  return (
    <SplitContainer leftWeight={11} rightWeight={1} height="59px" key={passKey}>
      <Flex sx={{ lineHeight: '19px' }}>
        <Text>{text}</Text>
        <Link to='/' style={{ textDecoration: 'none', marginLeft: '14px' }}>
        <Text variant='link'>
          More Details
          </Text>
        </Link>
      </Flex>
      <RemoveIcon onClick={() => {}} />
    </SplitContainer>
  )
}