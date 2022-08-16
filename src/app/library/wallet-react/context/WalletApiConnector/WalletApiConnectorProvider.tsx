import UtilsShader from "@app/library/base/shader/utilsShader";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { WalletApiConnectorUI } from "../../WalletApiConnectorUI";
import { WalletApiConnectorContext } from './WalletApiConnectorContext';
import { BansTimer } from "@app/components/BansTimer";
import Countdown from 'react-countdown';
import { useSelector } from "react-redux";
import { selectSystemState } from "@app/store/SharedStore/selectors";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

let timeout;
let timeoutDelay = 2200;

export const WalletApiConnectorProvider: React.FC<{
  children?: React.ReactNode,
  isAuthorized: boolean,
  connectorWalletShaders: Array<UtilsShader>,
  loader: any,
  isLoaded: boolean
}> = props => {
  const { children, loader = <></>, isLoaded, isAuthorized, connectorWalletShaders } = props;

  const [walletShaders, setWalletShaders] = useState<Array<UtilsShader>>(null);
  const [isTimeoutComplete, setIsTimeoutComplete] = useState<boolean>(false);

  const currentStatic = useRef<{ currentHeight?: number, currentStateTimestamp?: number }>({});
  const { current_height: currentHeight, current_state_timestamp: currentStateTimestamp } = useSelector(selectSystemState());
  const { width, height } = useWindowSize()
  const [confetti, setConfetti] = useState<boolean>(false);
  const [confettiRun, setConfettiRun] = useState<boolean>(false);

  useEffect(() => {
    if (!currentStatic.current?.currentHeight)
      currentStatic.current.currentHeight = currentHeight;
    if (!currentStatic.current?.currentStateTimestamp)
      currentStatic.current.currentStateTimestamp = currentStateTimestamp;

  }, [currentHeight, currentStateTimestamp]);

  useEffect(() => {
    setWalletShaders(connectorWalletShaders);
  }, [connectorWalletShaders]);

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setIsTimeoutComplete(true);
    }, timeoutDelay);
  }, [isLoaded])


  if (!isLoaded || !isTimeoutComplete)
    return (
      <WalletApiConnectorUI>
        {loader}
      </WalletApiConnectorUI>
    )

  // Renderer callback with condition
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {

      // Render a completed state
      if (isAuthorized && walletShaders) {
        const provider = {
          walletShaders,
          isAuthorized,
        };

        let timeout = setTimeout(() => {
          setConfetti(false);
        }, 3000);

        let timeoutForRun = setTimeout(() => {
          setConfettiRun(false);
        }, 8000);


        return <>
          <Confetti
            width={width - 20}
            height={height - 50}
            gravity={0.35}
            numberOfPieces={confetti ? 333 : 0}
            run={confettiRun}
          />
          <WalletApiConnectorContext.Provider value={provider}>{children}</WalletApiConnectorContext.Provider>
        </>
      }

    } else {
      setConfetti(true)
      setConfettiRun(true)

      // Render a countdown
      return <>
        <BansTimer {...{ days, hours, minutes, seconds }} />
      </>
    }
  }

  if (currentStatic.current.currentHeight && currentStatic.current.currentStateTimestamp) {
    const releseHeight = 1896183;
    const countdownUnix = ((releseHeight - currentStatic.current.currentHeight) * 60 + currentStatic.current.currentStateTimestamp) * 1000;

    return <Countdown
      date={countdownUnix}
      renderer={countdownRenderer}
    />

  }

  return <></>;

}
