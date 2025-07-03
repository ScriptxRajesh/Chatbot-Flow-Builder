import { createContext, useState } from "react";
import type { ReactNode } from "react";

type NodeContextType = {
  flowHaveChanges: boolean;
  setFlowHaveChanges: (val: boolean) => void;
  flowHaveErrors: boolean;
  setFlowHaveErrors: (val: boolean) => void;
  toggleBtnClick: boolean;
  setToggleBtnClick: (val: boolean) => void;
  nodeSelected: any;
  setNodeSelected: (val: any) => void;
};

export const NodeContext = createContext<NodeContextType>({} as NodeContextType);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [flowHaveChanges, setFlowHaveChanges] = useState(false);
  const [flowHaveErrors, setFlowHaveErrors] = useState(false);
  const [toggleBtnClick, setToggleBtnClick] = useState(false);
  const [nodeSelected, setNodeSelected] = useState(null);

  return (
    <NodeContext.Provider
      value={{
        flowHaveChanges,
        setFlowHaveChanges,
        flowHaveErrors,
        setFlowHaveErrors,
        toggleBtnClick,
        setToggleBtnClick,
        nodeSelected,
        setNodeSelected,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export default ContextProvider;
