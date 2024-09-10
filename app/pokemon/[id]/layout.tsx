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

export default function BattleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-8 py-10 md:p-20">{children}</div>;
}
