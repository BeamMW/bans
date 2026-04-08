import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container, Flex, Text } from 'theme-ui';
import Input from '@app/components/Input';
import { useEffect } from 'react';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import Button from '@app/components/Button';

import SearchIcon from "@app/assets/icons/search.svg";
import RemoveIcon from "@app/assets/icons/remove.svg";
import Sell from '@app/assets/icons/send.svg';
import { Notification } from '@app/components/Notification/Notifcation';
import { useSelector } from 'react-redux';
import { selectNotifications } from '@app/store/NotificationsStore/selectors';
import { NotificationState, NotificationType } from '@app/library/bans/userLocalDatabase/domainObject';
import { deleteNotification, updateNotificationState } from '@app/library/bans/userLocalDatabase/dao/userNotifications';
import { useNavigate } from 'react-router-dom';
import BeamDappConnector from '@core/BeamDappConnector.js';

const Notifications: React.FC = () => {
    const [notificationsList, setNotificationsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const notifications = useSelector(selectNotifications);

    const generateText = (notification) => {
        if (notification.type === NotificationType.favorites)
            return `Your Favorite domain ${notification.notifyData.domain.name}.beam is available now`

        if (notification.type === NotificationType.sold)
            return `Your Domain ${notification.notifyData.domain.name}.beam has been sold`

        if (notification.type === NotificationType.transferred)
            return `Your Received a ${BeamDappConnector.grothToBeam(notification.notifyData.transfer.amount)} BEAM transfer to ${notification.notifyData.transfer.domain}.beam`

        if (notification.type === NotificationType.gifted)
            return `Domain ${notification.notifyData.domain.name}.beam has been transferred to you`

    };

    const handler = useCallback((notification) => {
        if ([NotificationType.gifted, NotificationType.favorites, ].includes(notification.type)) {
            const active = NotificationType.favorites == notification.type ? 2 : 1;
            return navigate("my-page", { state: { active: active } })
        }

        if ([NotificationType.transferred, NotificationType.sold].includes(notification.type))
            return navigate("transactions")

    }, []);

    const closeHandler = useCallback((notification) => {
        if (notification.type === NotificationType.favorites)
            updateNotificationState(notification.gid, NotificationState.disabled);

        if ([NotificationType.sold, NotificationType.transferred, NotificationType.gifted].includes(notification.type))
            deleteNotification(notification.gid);

    }, []);

    useEffect(() => {
        setNotificationsList(notifications);
        setIsLoading(false);
    }, [notifications]);

    return (
        <Container sx={{ maxWidth: 800, width: 'fit-content' }}>
            {!!notificationsList && !!notificationsList.length && notificationsList.map((notification, i) => {
                return (notification?.notifyData &&
                    <>
                        <Notification
                            notification={notification}
                            passKey={i}
                            text={generateText(notification)}
                            handler={handler}
                            closeHandler={closeHandler}
                        />
                    </>
                );
            })}
        </Container>
    );
};

export default Notifications;
