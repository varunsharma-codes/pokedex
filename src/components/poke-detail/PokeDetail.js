import { useParams } from 'react-router-dom';
import { PokedexApi } from '../../api/pokedex';
import Spinner from '../common/spinner/Spinner';
import useAsyncOperation from '../hooks/useAsyncOperation';
import './PokeDetail.css';

const PokeDetail = () => {
  const { id } = useParams();

  const asyncFn = () => PokedexApi.getPokemon(id);
  const {
    notStarted,
    fetching,
    data: pokemon
  } = useAsyncOperation(asyncFn, [id]);

  return notStarted || fetching ? (
    <section className="pokedex-detail__loading-container">
      <Spinner />
    </section>
  ) : (
    <section>
      <h1>{pokemon.name}</h1>
    </section>
  );
};

export default PokeDetail;
