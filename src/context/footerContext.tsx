'use client'
import { createContext, useContext } from 'react';

type FooterContextType = {
  showFooter: boolean;
};

const FooterContext = createContext<FooterContextType>({ showFooter: true });

export function useFooterContext() {
  return useContext(FooterContext);
}

export default FooterContext;
