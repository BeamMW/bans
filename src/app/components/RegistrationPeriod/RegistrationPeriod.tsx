import React, { useCallback } from "react";
import { Flex, Text } from 'theme-ui';
import YearMinus from '../../assets/icons/year-minus.svg';
import YearPlus from '../../assets/icons/year-plus.svg';

interface PeriodProps {
  period: number;
  setPeriod: (period: number) => void;
}

const iconStyle = {
  cursor: "pointer",
};

const iconStyleShade = {...iconStyle, ...{opacity:0.5}}

export const RegistrationPeriod: React.FC<PeriodProps> = ({period, setPeriod}) => {


  const periodIncrease = useCallback(() => period < 50 && setPeriod(period + 1), [period]);
  const periodDecrease = useCallback(() => period > 1 && setPeriod(period - 1), [period]);


  return (
    <Flex>
      <Text variant="panelHeader">
        Registration period
      </Text>
      <YearMinus style={period > 1 ? iconStyle : iconStyleShade} onClick={periodDecrease} />
      <Text sx={{ mx: '12px' }}>{period} year</Text>
      <YearPlus style={period < 50 ? iconStyle : iconStyleShade} onClick={periodIncrease} />
    </Flex>
  )
}