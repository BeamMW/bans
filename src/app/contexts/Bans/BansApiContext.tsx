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
