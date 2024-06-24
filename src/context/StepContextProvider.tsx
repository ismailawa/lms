'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

export type StepContextType = {
  step: number;
  setStep: (step: number) => void;
};

export const StepContext = createContext<StepContextType | undefined>(
  undefined
);

const StepContextProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

export default StepContextProvider;

export const useStep = () => {
  const stepContext = useContext(StepContext);

  if (!stepContext) {
    throw new Error('useStep must be used within a StepContextProvider');
  }

  return stepContext;
};
