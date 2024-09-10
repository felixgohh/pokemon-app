import { Metadata } from 'next';
import battlefield from '@/assets/battlefield.jpg';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Catch ${params.id}`,
    description: `Catch ${params.id} from Poke API`,
  };
}

export default function BattleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundImage: `url(${battlefield.src})` }}
      className="bg-cover bg-center w-full h-full"
    >
      {children}
    </div>
  );
}
