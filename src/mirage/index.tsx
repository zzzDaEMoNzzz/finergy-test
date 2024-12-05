'use client';

import { useEffect } from 'react';

import { makeMirageServer } from './server';

export const MirageServer = () => {
  useEffect(() => {
    const server = makeMirageServer();
    return () => {
      server.shutdown();
    };
  }, []);
  return null;
};
