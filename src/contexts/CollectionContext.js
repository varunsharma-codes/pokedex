import { createContext } from 'react';

const noop = () => {};

export const CollectionContext = createContext({
  collection: [],
  setCollection: noop
});
