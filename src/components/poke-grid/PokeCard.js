import React from 'react';
import { Link } from 'react-router-dom';
import './PokeCard.css';

const PokeCard = props => {
  const { id, name } = props;
  const label = `Pokémon: ${name}`;
  return (
    <Link aria-label={label} className="pokemon-card" to={`/pokemon/${id}`}>
      <figure className="pokemon-card__image">
        <img
          height="180px"
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          alt={label}
        />
      </figure>
      <div className="pokemon-card__info">
        <span className="pokemon-card__id">#{id}</span>
        <span className="pokemon-card__name">{name}</span>
      </div>
    </Link>
  );
};

export default PokeCard;
