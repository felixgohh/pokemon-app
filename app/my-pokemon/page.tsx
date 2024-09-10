'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type MyPokemon = {
  name: string;
  nickname: string;
  id: string;
};

export default function MyPokemonPage() {
  const [pokemonList, setPokemonList] = useState<MyPokemon[] | null | []>(
    JSON.parse(localStorage.getItem('my_pokemons') || 'null')
  );

  const removePokemon = (pokemon: MyPokemon) => {
    if (pokemonList && pokemonList.length) {
      console.log(pokemon, '===pokemon');
      console.log(pokemonList);

      const newList = pokemonList.filter(
        (poke) =>
          poke.name !== pokemon.name && poke.nickname !== pokemon.nickname
      );
      setPokemonList(newList);
      localStorage.setItem('my_pokemons', JSON.stringify(newList));
    }
  };

  if (!pokemonList || !pokemonList.length) {
    return <p className="text-center my-8">No Pokemon catched!</p>;
  }

  const PokemonCard = ({ pokemon }: { pokemon: MyPokemon }) => {
    return (
      <article className="flex flex-col items-center justify-center border-4 shadow-thick rounded-lg border-black dark:border-white">
        <button
          type="button"
          className="ml-auto"
          onClick={() => removePokemon(pokemon)}
        >
          <XMarkIcon className="w-7 h-7 p-1" />
        </button>
        <Link href={`/pokemon/${pokemon.name}`}>
          <figure className="relative aspect-square w-[90%] h-[20vh] md:h-[30vh]">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              fill
            />
          </figure>
          <p className="uppercase mt-4 py-2 border-t border-t-black dark:border-t-white w-full text-center">
            {pokemon.name}
          </p>
          <p className="uppercase mt-4 py-2  w-full text-center">
            ({pokemon.nickname})
          </p>
        </Link>
      </article>
    );
  };

  return (
    <div className="flex flex-col px-8 py-10 md:p-20">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={`mypokemon-${pokemon.nickname}-${pokemon.name}`}
            pokemon={pokemon}
          />
        ))}
      </section>
    </div>
  );
}
