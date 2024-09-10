import { useQuery } from '@tanstack/react-query';
import { PokemonData, PokemonDetail } from '@/shared/types/pokemon.type';

const fetchPokemenList = async (
  offset: number | null
): Promise<PokemonData> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}`
  );
  if (!response.ok) {
    throw new Error('Error when fetching Pokemon list');
  }
  return response.json();
};

const fetchPokemenDetail = async (name: string): Promise<PokemonDetail> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Error when fetching Pokemon detail for ${name}`);
  }
  return response.json();
};

export const usePokemonList = (offset: number | null) => {
  return useQuery<PokemonData, Error>({
    queryKey: ['pokemon-list', offset],
    enabled: offset !== null,
    queryFn: () => fetchPokemenList(offset),
  });
};

export const usePokemonDetail = (name: string) => {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemon', name],
    enabled: name.length > 0,
    queryFn: () => fetchPokemenDetail(name),
  });
};
