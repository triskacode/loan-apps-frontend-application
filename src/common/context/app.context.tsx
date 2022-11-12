import {
  createContext,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface IAppContext {
  paymentSecret?: string | undefined;
  setPaymentSecret?: React.Dispatch<SetStateAction<string | undefined>>;
}

const AppContext = createContext<IAppContext>({});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [paymentSecret, setPaymentSecret] = useState<string>();
  const state = useMemo(
    () => ({ paymentSecret, setPaymentSecret }),
    [paymentSecret]
  );

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
