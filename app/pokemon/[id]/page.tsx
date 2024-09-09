import PokomenDetail from '@/components/PokemenDetail';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `${params.id} | Pokemon App`,
    description: `Details about ${params.id} from Poke API`,
  };
}

export default function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PokomenDetail name={params.id} />;
}
