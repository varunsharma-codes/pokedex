import { useState } from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import { CollectionContext } from './contexts/CollectionContext';

const App = () => {
  const [collection, setCollection] = useState([]);

  return (
    <Route path="/">
      <CollectionContext.Provider value={{ collection, setCollection }}>
        <Main />
      </CollectionContext.Provider>
    </Route>
  );
};

export default App;
