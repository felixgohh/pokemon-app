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

type PokemonAbility = {
  ability: PokemonItem;
  is_hidden: boolean;
  slot: number;
};

type PokemonMove = {
  move: PokemonItem;
};

type PokemonStat = {
  base_stat: number;
  stat: PokemonItem;
};

type PokemonType = {
  slot: number;
  type: PokemonItem;
};

type PokemonDetail = {
  id: string;
  height: number;
  name: string;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
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
