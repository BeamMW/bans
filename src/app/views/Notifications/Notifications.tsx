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

const Notifications: React.FC = () => {
  const { foundDomain, setFoundDomain } = useMainView();

  const [isValid, setIsValid] = useState(true);
  const [search, setSearch] = useState(foundDomain ? foundDomain.name : "");
  const [isLoading, setIsLoading] = useState(false);
  const {open} = useModalContext();

 

  useEffect(() => {
    //if search already exists
    !!foundDomain && (
      setSearch(foundDomain.name),
      setIsValid(true)
    );
  }, []);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.indexOf('-') != -1 || e.target.value.indexOf('_') != -1 || e.target.value.indexOf('~') != -1) {
      return false;
    };
    setSearch(e.target.value.toLocaleLowerCase());
  }

  return (
    <Container sx={{ maxWidth: 630 }}>
      <Notification />
    </Container>
  );
};

export default Notifications;
