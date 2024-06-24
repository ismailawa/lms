'use client';
import {
  EmailFormSchemaType,
  FormSchemaType,
  OTPFormSchemaType,
  defaulEmailFormSchemaValue,
  defaultFormSchemaValue,
  defaultOTPFormSchemaValue,
} from '../types';
import { ReactNode, createContext, useContext, useState } from 'react';

export type FinalValueContextType = {
  values: FormSchemaType & OTPFormSchemaType & EmailFormSchemaType;
  setValues: (
    values: FormSchemaType & OTPFormSchemaType & EmailFormSchemaType
  ) => void;
};

export const FinalValueContext = createContext<
  FinalValueContextType | undefined
>(undefined);

const FinalValueContextProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState({
    ...defaultFormSchemaValue,
    ...defaultOTPFormSchemaValue,
    ...defaulEmailFormSchemaValue,
  });
  return (
    <FinalValueContext.Provider value={{ values, setValues }}>
      {children}
    </FinalValueContext.Provider>
  );
};

export default FinalValueContextProvider;

export const useFinalValue = () => {
  const finalValueContext = useContext(FinalValueContext);

  if (!finalValueContext) {
    throw new Error(
      'useFinalValueContext must be used within a FinalValueContextProvider'
    );
  }

  return finalValueContext;
};
