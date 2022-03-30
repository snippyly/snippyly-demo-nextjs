import { createContext, useContext } from 'react';

export const SnippylyContext = createContext({ client: null });

export function useSnippylyClient() {
  return useContext(SnippylyContext);
}