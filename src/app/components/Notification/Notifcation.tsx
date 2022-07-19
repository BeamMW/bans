import { RemoveIcon } from "@app/assets/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text } from "theme-ui";
import { SplitContainer } from "../SplitContainer/SplitContainer";


export const Notification = ({text, handler, closeHandler}) => {
  return (
    <SplitContainer leftWeight={11} rightWeight={1} height="59px">
      <Flex sx={{ lineHeight: '19px' }}>
        <Text>Your Favorite domain geek.beam is available now</Text>
        <Text variant='link'>
          More Details
          </Text>
      </Flex>
      <RemoveIcon onClick={() => {}} />
    </SplitContainer>
  )
}