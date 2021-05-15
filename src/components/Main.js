import React, { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { CollectionContext } from '../contexts/CollectionContext';
import Badge from './common/badge/Badge';
import './Main.css';
import PokeDetail from './poke-detail/PokeDetail';
import PokeGrid from './poke-grid/PokeGrid';

const Main = () => {
  const { collection } = useContext(CollectionContext);
  return (
    <div className="pokedex">
      <header className="pokedex-header">
        <Link className="pokedex-header__title" to="/">
          Pokémon
        </Link>
        <Link className="pokedex-header__inventory" to="/inventory">
          Inventory<Badge>{collection.length}</Badge>
        </Link>
      </header>
      <main className="pokedex-content">
        <Switch>
          <Route path="/pokemon/:id" component={PokeDetail} />
          <Route path="/inventory" />
          <Route path="/" component={PokeGrid} />
        </Switch>
      </main>
    </div>
  );
};

export default Main;
