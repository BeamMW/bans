import { RemoveIcon } from "@app/assets/icons";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { deleteNotification, updateNotificationState } from "@app/library/bans/userLocalDatabase/dao/userNotifications";
import { NotificationState } from "@app/library/bans/userLocalDatabase/domainObject";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text } from "theme-ui";
import { SplitContainer } from "../SplitContainer/SplitContainer";

//sx={{ background: "rgb(9 19 30)", position: "absolute",width:"100%", maxWidth:"630px", mt: 10 * passKey }}
export const Notification = ({ notification, text, handler, closeHandler = null, passKey }) => {
  const {setCurrentView} = useMainView()

  const handleCloseNotification = () => {
    return !! closeHandler ? closeHandler(notification) : updateNotificationState(notification.gid, NotificationState.disabled);
  };

  const moreDetailsHandler = () => {
    handler(notification);
    handleCloseNotification();
  }

  return (
    <SplitContainer passKey={passKey} styles={{ background: "rgba(0, 246, 210, 0.1)", /* position: "absolute", */ maxWidth: "800px", minWidth: '650px'/* , marginTop: 10 * passKey */ }} leftWeight={5} rightWeight={7} height="59px" key={passKey}>
      <Flex sx={{ lineHeight: '19px' }}>
        <Text sx={{whiteSpace:'nowrap'}}>{text}</Text>
      </Flex>
      <Box>
      <span onClick={moreDetailsHandler} style={{ textDecoration: 'none', marginLeft: '14px'}}>
          <Text variant='link' sx={{mr: 3 }}>
            More Details
          </Text>
        </span>
      <RemoveIcon onClick={handleCloseNotification} />
      </Box>
    </SplitContainer>
  )
}