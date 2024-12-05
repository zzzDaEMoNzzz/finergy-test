'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import { AppStore, makeStore } from '@/store';

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      return setupListeners(storeRef.current.dispatch);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
