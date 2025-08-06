import { createContext, useContext, useState } from 'react';

const PageActionsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePageActions = () => {
  const context = useContext(PageActionsContext);
  if (!context) {
    throw new Error('usePageActions must be used within PageActionsProvider');
  }
  return context;
};

export const PageActionsProvider = ({ children }) => {
  const [actions, setActions] = useState({});

  const registerAction = (actionName, actionFunction) => {
    setActions((prev) => ({
      ...prev,
      [actionName]: actionFunction,
    }));
  };

  const unregisterAction = (actionName) => {
    setActions((prev) => {
      const newActions = { ...prev };
      delete newActions[actionName];
      return newActions;
    });
  };

  const executeAction = (actionName, ...args) => {
    if (actions[actionName]) {
      return actions[actionName](...args);
    } else {
      console.warn(`Action ${actionName} is not registered`);
    }
  };

  return (
    <PageActionsContext.Provider
      value={{ registerAction, unregisterAction, executeAction, actions }}
    >
      {children}
    </PageActionsContext.Provider>
  );
};
