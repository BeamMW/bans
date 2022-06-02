import { createContext, useContext } from "react";

export type WalletApiConnectorContextType = {
  some?: any
};

export const WalletApiConnectorContext = createContext<WalletApiConnectorContextType | null>(null);

export const useWalletApiConnector = (): WalletApiConnectorContextType => {
  const context: WalletApiConnectorContextType | null = useContext(WalletApiConnectorContext);

  if (context === null) {
    throw new Error("You must add a <WalletApiConnectorProvider> into the React tree");
  }

  return context;
};
