import { redirect } from 'next/navigation';

export default function PokemonPage() {
  redirect('/pokemon/bulbasaur');

  return <h1>Redirecting to Bulbasaur</h1>;
}
