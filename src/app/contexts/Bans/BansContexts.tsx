import { createContext, useContext } from "react";

type BansApiContextType = {
    registeredMethods: any/* IRegisteredMethods<ShaderActions> */
};

export const BansApiContext = createContext<BansApiContextType | null>(null);

export const useBansApi = (): BansApiContextType => {
  const context: BansApiContextType | null = useContext(BansApiContext);

  if (context === null) {
    throw new Error("You must add a <BansApiContext> into the React tree");
  }

  return context;
};


type BansContextType = any;

export const BansContext = createContext<BansContextType | null>(null);

export const useBansView = (): BansContextType => {
const context: BansContextType | null = useContext(BansContext);

if (context === null) {
  throw new Error("You must add a <BansContext> into the React tree");
}

return context;
};
