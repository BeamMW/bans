import { createContext, useContext } from "react";

type BansApiContextType = {
    registeredMethods/* IRegisteredMethods<ShaderActions> */
};

export const BansApiContext = createContext<BansApiContextType | null>(null);

export const useBansApi = (): BansApiContextType => {
  const context: BansApiContextType | null = useContext(BansApiContext);

  if (context === null) {
    throw new Error("You must add a <BansApiContext> into the React tree");
  }

  return context;
};


type MainViewContextType = any;

export const MainContext = createContext<MainViewContextType | null>(null);

export const useMainView = (): MainViewContextType => {
const context: MainViewContextType | null = useContext(MainContext);

if (context === null) {
  throw new Error("You must add a <MainContext> into the React tree");
}

return context;
};
