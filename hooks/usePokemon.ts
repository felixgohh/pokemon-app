import { useQuery } from '@tanstack/react-query';

export type PokemonItem = {
  name: string;
  url: string;
};

type PokemonData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

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

export const usePokemonList = (offset: number | null) => {
  return useQuery<PokemonData, Error>({
    queryKey: ['pokemon-list', offset],
    enabled: offset !== null,
    queryFn: () => fetchPokemenList(offset),
  });
};
