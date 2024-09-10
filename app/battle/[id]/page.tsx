'use client';

import { usePokemonDetail } from '@/hooks/usePokemon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function PokemonBattlePage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = usePokemonDetail(params.id);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const toastErrMessage = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      theme: 'colored',
      hideProgressBar: true,
      closeButton: false,
      autoClose: 3500,
      toastId: 'pokemon-error',
    });
  };

  const catchPokemon = () => {
    const catched = Math.random() > 0.5 ? true : false;

    if (!catched) {
      return toastErrMessage(`Oops! Wild ${data?.name} got away...`);
    }

    setShowModal(true);
  };

  const PokemonModal = () => {
    const [nickname, setNickname] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    };

    const handleSubmit = (ev: React.FormEvent) => {
      ev.preventDefault();

      if (nickname) {
        const newPokemon = {
          name: data?.name,
          nickname,
          id: data?.id,
        };

        const myPokemons = JSON.parse(
          localStorage.getItem('my_pokemons') || 'null'
        );

        if (!myPokemons || !myPokemons.length) {
          localStorage.setItem('my_pokemons', JSON.stringify([newPokemon]));
          router.back();
        } else {
          const existed = myPokemons.filter(
            (poke) => poke.nickname === nickname && poke.name === data?.name
          );
          if (existed.length) {
            return toastErrMessage(
              `Oops! You have given a ${data?.name} this nickname.`
            );
          }

          localStorage.setItem(
            'my_pokemons',
            JSON.stringify([...myPokemons, newPokemon])
          );
          router.back();
        }
      }
    };

    return (
      <div className="fixed w-full h-[100vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] flex justify-center items-center bg-black bg-opacity-50">
        <div className="relative p-6 w-3/4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 capitalize text-center">
            You have caught {data?.name}
          </h3>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nickname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showModal ? <PokemonModal /> : null}
      <section className="flex flex-col justify-center items-center relative h-full">
        <h1 className="capitalize font-bold text-2xl text-red-500 mt-4">
          Wild {data?.name} appreas
        </h1>
        <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`}
            alt={data?.name ?? 'pokemon'}
            width={200}
            height={200}
          />
        </figure>
        <div className="mt-auto flex flex-col items-center gap-4 mb-4">
          <p className="font-bold">What will you do..?</p>
          <div className="flex flex-row justify-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 rounded-lg bg-green-200 text-black text-lg font-bold shadow-thick"
            >
              Run
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-yellow-400 text-black text-lg font-bold shadow-thick"
              onClick={catchPokemon}
            >
              Catch
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
