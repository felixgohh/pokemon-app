'use client';

import { usePokemonDetail } from '@/hooks/usePokemon';
import Image from 'next/image';
import Link from 'next/link';

export default function PokomenDetail({ name }: { name: string }) {
  const { data } = usePokemonDetail(name);

  const PokemenType = ({ type, index }: { type: string; index: number }) => {
    return (
      <p
        className={`p-2 rounded-lg ${
          index % 2 === 0 ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {type}
      </p>
    );
  };

  const PokemonStat = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex flex-col">
        <p>{name}</p>
        <div className="w-full relative bg-white h-1 rounded-lg">
          <div
            style={{ width: `${value > 100 ? '100' : value.toString()}%` }}
            className={`bg-yellow-400 absolute left-0 top-0 h-1 rounded-lg`}
          ></div>
        </div>
        <p>{value}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:w-[80%] lg:w-[60%] text-xs md:text-base capitalize font-bold mx-auto">
      <section className="flex flex-col justify-center items-center p-4 rounded-lg border dark:border-white border-black shadow-thick">
        <figure className="w-full h-[20vh] relative">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`}
            alt={data?.name ?? 'pokemon'}
            fill
            priority
          />
        </figure>
        <div className="flex flex-wrap gap-2 mt-4">
          {data?.types.map((type, index) => (
            <PokemenType
              type={type.type.name}
              index={index}
              key={`type-${index}`}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-1 border dark:border-white border-black shadow-thick rounded-lg p-4">
        {data?.stats.map((stat, index) => (
          <PokemonStat
            name={stat.stat.name}
            value={stat.base_stat}
            key={`stat-${index}`}
          />
        ))}
      </section>
      <section className="col-span-2 border dark:border-white border-black shadow-thick rounded-lg flex flex-col gap-2 p-4 tracking-wide">
        <p>Name : {data?.name}</p>
        <p>Weight : {data?.weight}</p>
        <p>Height : {data?.height}</p>
      </section>
      <section className="flex flex-col gap-2 p-4 border dark:border-white border-black shadow-thick rounded-lg">
        {data?.abilities
          .filter((a) => !a.is_hidden)
          .map((ability) => (
            <p key={`ability-${ability.slot}`}>{ability.ability.name}</p>
          ))}
      </section>
      <section className="flex flex-col gap-2 p-4 border dark:border-white border-black shadow-thick rounded-lg">
        {data?.moves.slice(0, 4).map((move, index) => (
          <p key={`move-${index}`}>{move.move.name}</p>
        ))}
      </section>
      <Link
        href={`/battle/${data?.name}`}
        className="col-span-2 flex mx-auto w-[50%] bg-yellow-400 shadow-thick rounded-lg text-black p-3 text-center text-base md:text-lg"
      >
        <p className="w-full">Catch Pokemon!</p>
      </Link>
    </div>
  );
}
