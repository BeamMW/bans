import React, { useCallback, useMemo, useState } from 'react';
import { Box, Container, Flex, Text } from 'theme-ui';
import Input from '@app/components/Input';
import { useEffect } from 'react';
import { useMainView } from '@app/contexts/Bans/BansContexts';
import Button from '@app/components/Button';

import SearchIcon from "@app/assets/icons/search.svg";
import RemoveIcon from "@app/assets/icons/remove.svg";
import Sell from '@app/assets/icons/send.svg';
import { useFetchDomainAndConvert } from '@app/hooks/useFetchDomainAndConvert';
import { useSearchValidator } from '@app/hooks/useSearchValidator';
import { useModalContext } from '@app/contexts/Modal/ModalContext';
import { Notification } from '@app/components/Notification/Notifcation';
import { useSelector } from 'react-redux';
import { selectNotifications } from '@app/store/NotificationsStore/selectors';

const Notifications: React.FC = () => {
    const [notificationsList, setNotificationsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const notifications = useSelector(selectNotifications());

    useEffect(() => {
       setNotificationsList(notifications);
    }, [notifications]);

    return (
        <Container sx={{ maxWidth: 630 }}>
            {!!notificationsList && !!notificationsList.length && notificationsList.map((notification, i) => {
                return ( notification?.notifyData && 
                    <>
                        <Notification
                            notification={notification}
                            passKey={i}
                            text={`Your Favorite domain ${notification.notifyData.domain.name}.beam is available now`}
                            handler={() => { }}
                        />
                    </>
                );
            })}
        </Container>
    );
};

export default Notifications;
