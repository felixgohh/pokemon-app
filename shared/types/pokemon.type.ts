export type PokemonItem = {
  name: string;
  url: string;
};

export type PokemonData = {
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

export type PokemonDetail = {
  id: string;
  height: number;
  name: string;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
};

export type MyPokemon = {
  name: string;
  nickname: string;
  id: string;
};
