'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { usePokemonList } from '@/hooks/usePokemon';
import { PokemonItem } from '@/shared/types/pokemon.type';
import LoadingSpinner from '@/components/LoadingSpinner';

type PokemonCardProps = {
  pokemon: PokemonItem;
  index: number;
};

const PokemonCard = ({ pokemon, index }: PokemonCardProps) => {
  const searchParams = useSearchParams();
  const offsetParam = searchParams.get('offset');
  const offset = offsetParam ? Number(offsetParam) : 0;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <article className="flex flex-col items-center justify-center border-4 shadow-thick rounded-lg border-black dark:border-white">
        <figure className="relative aspect-square w-[90%] h-[20vh] md:h-[30vh]">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              Number(offset) + index + 1
            }.svg`}
            alt={pokemon.name}
            fill
          />
        </figure>
        <p className="uppercase mt-4 py-2 border-t border-t-black dark:border-t-white w-full text-center">
          {pokemon.name}
        </p>
      </article>
    </Link>
  );
};

const HomeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [offset, setOffset] = useState<number | null>(null);
  const { data, isLoading } = usePokemonList(offset);

  useEffect(() => {
    const offsetParam = searchParams.get('offset');
    const initialOffset = offsetParam ? Number(offsetParam) : 0;

    setOffset(initialOffset);
  }, [searchParams]);

  const handlePage = (option: string) => {
    const urlString = option === 'prev' ? data?.previous : data?.next;

    if (urlString) {
      const urlObject = new URL(urlString);
      const offset = urlObject.searchParams.get('offset');
      router.push(`/?offset=${offset}`);
    }
  };

  return (
    <div className="flex flex-col px-8 py-10 md:p-20">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {data?.results.map((pokemon, index) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} index={index} />
        ))}
      </section>

      {data && data.results ? (
        <section className="mt-6 w-full flex justify-between items-center dark:text-white text-black">
          <button
            onClick={() => handlePage('prev')}
            disabled={isLoading || !data?.previous}
          >
            <ArrowLeftCircleIcon className="h-10 w-10" />
          </button>
          <button
            onClick={() => handlePage('next')}
            disabled={isLoading || !data?.next}
          >
            <ArrowRightCircleIcon className="h-10 w-10" />
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
