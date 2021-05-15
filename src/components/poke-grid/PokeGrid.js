import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PokedexApi } from '../../api/pokedex';
import Spinner from '../common/spinner/Spinner';
import PokeCard from './PokeCard';
import './PokeGrid.css';

const LIMIT = 40;

const PokeGrid = () => {
  const [fetching, setFetching] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);

  const getPokemonList = useCallback(async o => {
    setFetching(true);
    const response = await PokedexApi.getPaginatedPokemonList(o, LIMIT);
    setPokemonList(prevList => [...prevList, ...response]);
    setFetching(false);
  }, []);

  const fetchMorePokemon = () => {
    setOffset(prev => prev + LIMIT);
  };

  useEffect(() => {
    getPokemonList(offset);
  }, [offset, getPokemonList]);

  const prevYRef = useRef(0);

  const intersectionObserverCallback = entries => {
    const observedElement = entries[0];
    const { y } = observedElement.boundingClientRect;
    if (prevYRef.current > y) {
      fetchMorePokemon();
    }
    prevYRef.current = y;
  };

  const observer = useRef(
    new IntersectionObserver(intersectionObserverCallback, { threshold: 0.1 })
  );
  const observedElementRef = useRef(null);

  useEffect(() => {
    const currentObserver = observer.current;
    const currentObservedElementRef = observedElementRef
      ? observedElementRef.current
      : undefined;
    if (currentObservedElementRef) {
      currentObserver.observe(observedElementRef.current);
    }

    return () => {
      if (currentObservedElementRef) {
        currentObserver.unobserve(currentObservedElementRef);
      }
    };
  }, []);

  return (
    <div className="pokedex-grid">
      {pokemonList.map(pokemon => (
        <PokeCard key={pokemon.name} {...pokemon} />
      ))}
      <div
        aria-live="polite"
        aria-busy={fetching}
        className="pokedex-grid__loader"
        ref={observedElementRef}
      >
        {fetching && <Spinner />}
      </div>
    </div>
  );
};

export default PokeGrid;
