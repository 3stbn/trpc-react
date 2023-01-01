import { tutorialStatus, tutorialStatusEnum } from "../../../lib";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
} from "react";

interface AppContextValue {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedTab: tutorialStatus;
  setSelectedTab: Dispatch<SetStateAction<tutorialStatus>>;
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<tutorialStatus>(
    tutorialStatusEnum[0]
  );
  return (
    <AppContext.Provider
      value={{ showModal, setShowModal, setSelectedTab, selectedTab }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  if (!useContext(AppContext)) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return useContext(AppContext);
}
